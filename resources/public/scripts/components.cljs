(ns mx.components
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om]
            [om-tools.core :refer-macros [defcomponent]]
            [om-tools.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! <! chan]]
  ))

;;; helpers

(defn- get-node-value [node name]
  (->
    node
    (om/get-node name)
    (.-value)
  ))

(defn- toggle-visibility [vis]
  (case vis
    "private" "public"
    "public" "private"))

;;; components

; sign in & sign up buttons component
(defcomponent sign-buttons [_ _]
  (render-state [_ _]
    (dom/div
      (dom/a {:href "/#/sign-in"}
        (dom/button nil "Sign In"))
      (dom/a {:href "/#/sign-up"}
        (dom/button nil "Sign Up")))))

; sign out component TODO: tbi
(defn- on-sign-out-click [app owner]
  (let [rsp-ch (chan)]
    (put! (om/get-shared owner :srv-ch) {:tag :sign-out :rsp-ch rsp-ch})
    (go
      (let [{:keys [ok? user] :as res} (<! rsp-ch)]
        (case ok?
          true (do
            (om/update! app :authenticated false)
            (om/update! app :user-id nil)
            (println "signed out!"))  ; TODO: transition
          false (println "uh oh" (:error res)))))))

(defcomponent sign-out-button [app owner]
  (render-state [_ _]
    (dom/div
      (dom/button {:on-click (partial on-sign-out-click app owner)} "Sign Out"))))

; sign in/up component
(defn- set-error [owner msg]
  (om/set-state! owner :error-msg msg))

(defn- sign [app owner type username password]
  (let [rsp-ch (chan)]
    (set-error owner "") ; clear error
    (put! (om/get-shared owner :srv-ch) {:tag type :username username :password password :rsp-ch rsp-ch})
    (go (while true
      (let [{:keys [ok? user] :as res} (<! rsp-ch)]
        (case ok?
          true (do
            (om/update! app :user-id (:_id user))
            (om/update! app :username (:username user))
            (om/update! app :authenticated true)
            (println "great success!")) ; TODO: transition
          false (om/set-state! owner :error-msg (:error res))))))))

(defn- on-sign-click [app owner type & evt]
  (let [username (clojure.string/trim (get-node-value owner "username"))
        password (clojure.string/trim (get-node-value owner "password"))]
    (if (clojure.string/blank? username)
      (set-error owner "username required!")) ; TODO: correct this
    (if (clojure.string/blank? password)
      (set-error owner "password required!")) ; TODO: correct this
    ; else-all
    (if (not (or (clojure.string/blank? username) (clojure.string/blank? password)))
      (sign app owner type username password))))

(defcomponent sign-in-up [app owner]
  (init-state [_]
    {:error-msg ""})

  (render-state [_ {:keys [label type error-msg]}]
    (dom/div
      (dom/input {:type "text" :placeholder "username" :ref "username"})
      (dom/input {:type "password" :placeholder "password" :ref "password"})
      (dom/button {:on-click (partial on-sign-click app owner type)} label)
      (dom/div {:class "hidden" :ref "error"} error-msg)
    ))
  )

; note creator component
(defn- on-create-vis-click [owner & evt]
  (->>
    (om/get-state owner :visibility)
    (toggle-visibility)
    (om/set-state! owner :visibility)))

(defn- on-create-click [owner & evt]
  ; TODO: validate text (clojure.string/blank? (clojure.string/trim text))
  (put! (om/get-shared owner :srv-ch) {
    :tag :create-note
    :text (get-node-value owner "text")
    :visibility (om/get-state owner :visibility)
    :rsp-ch (om/get-state owner :rsp-ch)
  }))

(defcomponent note-creator [app owner]
  (init-state [_]
    {:text "" :visibility "private" :rsp-ch (chan)})

  (will-mount [_]
    (let [rsp-ch (om/get-state owner :rsp-ch)]
      (go (while true
        (let [{:keys [ok? note] :as res} (<! rsp-ch)]
          (case ok?
            true (do
              (om/set-state! owner :text "") ; TODO: not working because state is not correctly wired to the textarea
              (om/transact! app :notes #(vec (cons note %)))) ; TODO: hm...
            false (println "sad face") ; TODO: error msg...
          )
    )))))

  (render-state [this {:keys [text visibility rsp-ch]}]
    (dom/div
      ; TODO: we need to wire the textarea to our state so on-create-click views the most up to date data
      ; set-state! when the textarea is being edited.. but that's a bit inneficient, no?
      ; -text- is not being set when textarea is changed
      (dom/textarea {:rows 5 :columns 20 :ref "text" :placeholder "Don't forget, create a note..." });:value text})
      (dom/button {:ref "visibility" :on-click (partial on-create-vis-click owner)} visibility)
      (dom/button {:on-click (partial on-create-click owner)} "create!")
  )))

; note item component
(defn- on-item-vis-change [cursor owner srv-ch & evt] ;[_id visibility srv-ch rsp-ch & evt]
  ; TODO: some kind of "progress bar element" should be activated
  ; TODO: disable visibility change button while operation is pending
  (let [rsp-ch (chan)]
    (put! srv-ch {:tag :update-note, :rsp-ch rsp-ch :note {:note-id (:_id @cursor) :visibility (toggle-visibility (:visibility @cursor))}})
    (go (while true
      (let [{:keys [ok?] :as res} (<! rsp-ch)]
        (case ok?
          ; TODO: re-enable visibility change button
          true (om/transact! cursor :visibility toggle-visibility) ; TODO: hm... I don't like this
          false (println "sad face") ; TODO: error msg...
  ))))))

(defn- on-item-delete [cursor owner srv-ch evt-ch & evt]
  ; TODO: some kind of "progress bar element" should be activated
  ; TODO: disable delete button while operation is pending
  (let [rsp-ch (chan)]
    (put! srv-ch {:tag :delete-note, :rsp-ch rsp-ch, :note-id (:_id @cursor)})
    (go (while true
      (let [{:keys [ok?] :as res} (<! rsp-ch)]
        (case ok?
          true (put! evt-ch [:destroy @cursor])
          false (println "sad face") ; TODO: error msg, re-enable delete, etc
  ))))))

(defcomponent note-item [{:keys [_id text date visibility] :as cursor} owner]
  (render-state [this {:keys [vis-rsp-ch evt-ch]}]
    (let [srv-ch (om/get-shared owner :srv-ch)]
      (dom/li {:class "note"}
        (dom/div
          (dom/a {:href (str "/#/notes/" _id)} text)
          (dom/button {:on-click (partial on-item-delete cursor owner srv-ch evt-ch)} "delete"))
        (dom/div
          (dom/span {:class "date"} date)
          (dom/button {:class "visibility" :on-click (partial on-item-vis-change cursor owner srv-ch)} visibility)
  )))))

; notes list component
(defn- get-notes [app owner]
  (let [srv-ch (om/get-shared owner :srv-ch)
        user-id (.getItem js/localStorage :user-id) ; TODO: ew... this should be coming from app-state
        rsp-ch (chan)]
    (put! srv-ch {:tag :get-private-notes :rsp-ch rsp-ch :user-id user-id})
    (go (while true
      (let [{:keys [ok?] :as res} (<! rsp-ch)]
        (case ok?
          true (do
            (om/transact! app :notes #(vec (:notes res)))
            (om/set-state! owner :loading false))
          false (do
            (println ":(")) ; TODO: set error msg / click here to try again, etc
  ))))))

(defn- destroy-note [app owner]
  (let [evt-ch (om/get-state owner :evt-ch)]
    (go (while true
      (let [[evt cursor] (<! evt-ch)]
        (case evt
          :destroy (om/transact! app :notes (fn [notes] (into [] (remove #(= (:_id %) (:_id cursor)) notes))))
          (println "else!"))
  )))))

(defcomponent notes-list [{:keys [notes] :as app} owner]
  (init-state [_]
    {:loading true :evt-ch (chan)})

  (will-mount [_]
    (get-notes app owner) ; load initial data
    (destroy-note app owner))

  (render-state [_ {:keys [loading evt-ch]}]
    ; TODO: retrieving data from the server might fail - make view ready for that
    (dom/ul {:class "notes"}
      (if loading
        (dom/span "Loading...")
        (om/build-all note-item notes {:init-state {:evt-ch evt-ch}}))
  )))
