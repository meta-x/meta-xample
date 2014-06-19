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

(defcomponent sign-buttons [_ _]
  (render-state [_ _]
    (dom/div
      (dom/a {:href "/#/sign-in"}
        (dom/button {} "Sign In"))
      (dom/a {:href "/#/sign-up"}
        (dom/button {} "Sign Up"))
    )
  ))



(defn- on-sign-click [ch type owner & evt]
  (let [username (get-node-value owner "username")
        password (get-node-value owner "password")]
    (if (clojure.string/blank? username)
      (om/set-state! owner :error-msg "username required!")) ; TODO: correct this
    (if (clojure.string/blank? password)
      (om/set-state! owner :error-msg "password required!")) ; TODO: correct this
    ; else-all
    (if (not (or (clojure.string/blank? username)
                  (clojure.string/blank? password)))
      (do
        (om/set-state! owner :error-msg "")
        (put! ch {:tag type :username username :password password :rsp-ch (om/get-state owner :rsp-ch)}))
      )
  ))

(defcomponent sign-in-up [_ owner]
  (init-state [_]
    {:error-msg "" :rsp-ch (chan)})

  (will-mount [_]
    (go (while true
      (let [rsp-ch (om/get-state owner :rsp-ch)
            res (<! rsp-ch)] ; destructure res {:success? ... :...}
        (println "TODO: xxx" res)
        ; (case (:status res)
        ;   404 (om/set-state! owner :label "ahhhhhhhh") ; TODO: correct this
        ;   ; TODO: status code for existing username
        ;   ; TODO: error ... change UI, (om/set-state! owner ...)
        ;   500 (println "TODO: this shouldn't happen, server must return another error")
        ;   (println "..."))
    ))))

  (render-state [_ {:keys [label type error-msg]}]
    (dom/div
      (dom/input {:type "text" :placeholder "username" :ref "username"})
      (dom/input {:type "password" :placeholder "password" :ref "password"})
      (dom/button {:on-click (partial on-sign-click (om/get-shared owner :srv-ch) type owner)} label)
      (dom/div {:class "hidden" :ref "error"} error-msg)
    ))
  )




(defcomponent sign-out [_ owner] ; TODO: tbi
  (will-mount [_]

    )

  (render-state [_ _]

    )
  )





(defn- on-create-vis-click [owner & evt]
  (->>
    (om/get-state owner :visibility)
    (toggle-visibility)
    (om/set-state! owner :visibility)))

(defn- on-create-click [owner & evt]
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





(defn- on-item-vis-change [cursor srv-ch rsp-ch & evt]
  ; TODO: some kind of "progress bar element" should be activated
  (put! srv-ch {
    :tag :update-note
    :rsp-ch rsp-ch
    :note {
      :note-id (:_id @cursor)
      :visibility (toggle-visibility (:visibility @cursor))
    }}))

; (defn- on-item-text-update []
;   )

(defcomponent note-item [{:keys [text date visibility] :as cursor} owner]
  (init-state [_]
    {:rsp-ch (chan)})

  (will-mount [_]
    (let [rsp-ch (om/get-state owner :rsp-ch)]
      (go (while true
        (let [{:keys [ok?] :as res} (<! rsp-ch)]
          (case ok?
            true (om/transact! cursor :visibility toggle-visibility) ; TODO: hm... I don't like this
            false (println "sad face") ; TODO: error msg...
          )
  )))))

  (render-state [this {:keys [rsp-ch]}]
    (dom/li {:class "note"}
      (dom/label {:class "label"} text)
      (dom/span {:class "date"} date)
      (dom/button {:class "visibility" :on-click (partial on-item-vis-change cursor (om/get-shared owner :srv-ch) rsp-ch)} visibility)
    )
  ))





(defcomponent notes-list [{:keys [notes]} owner]
  (render-state [this state]
    (dom/ul {:class "notes"}
      (om/build-all note-item notes))
    )
  )


