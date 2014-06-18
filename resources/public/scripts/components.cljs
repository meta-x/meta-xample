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

(defn- on-sign-click [ch type owner & evt]
  (let [username (get-node-value owner "username")
        password (get-node-value owner "password")]
    (if (clojure.string/blank? username)
      (om/set-state! owner :label "username required!")) ; TODO: correct this
    (if (clojure.string/blank? password)
      (om/set-state! owner :label "password required!")) ; TODO: correct this
    ; else-all
    (if (not (or (clojure.string/blank? username)
                  (clojure.string/blank? password)))
      (put! ch [type username password]))
  ))

(defn- toggle-visibility [vis]
  (case vis
    "private" "public"
    "public" "private"))

;;; components

(defcomponent sign-buttons [data owner]
  (render-state [this {:keys [ch] :as state}]
    (dom/div
      (dom/a {:href "/#/sign-in"}
        (dom/button {:on-click #(put! ch :sign-in)} "Sign In"))
      (dom/a {:href "/#/sign-up"}
        (dom/button {:on-click #(put! ch :sign-up)} "Sign Up"))
    )
  ))

(defcomponent sign-in-up [data owner]
  (will-mount [_]
    (go (while true
      (let [parent-ch (om/get-state owner :ch)
            res (<! parent-ch)] ; destructure res {:success? ... :...}
        (case (:status res)
          404 (om/set-state! owner :label "ahhhhhhhh") ; TODO: correct this
          ; TODO: status code for existing username
          ; TODO: error ... change UI, (om/set-state! owner ...)
          500 (println "TODO: this shouldn't happen, server must return another error")
          (println "..."))
    ))))

  (render-state [this {:keys [label type ch] :as state}]
    (dom/div
      (dom/input {:type "text" :placeholder "username" :ref "username"})
      (dom/input {:type "password" :placeholder "password" :ref "password"})
      (dom/button {:on-click (partial on-sign-click ch type owner)} label)
    ))
  )



(defn- on-create-vis-click [owner & evt]
  (->>
    (om/get-state owner :visibility)
    (toggle-visibility)
    (om/set-state! owner :visibility)))

(defn- on-create-click [srv-ch rsp-ch owner & evt]
  (put! srv-ch {
    :tag :create-note
    :text (get-node-value owner "text")
    :visibility (om/get-state owner :visibility)
    :rsp-ch rsp-ch
  }))

(defcomponent note-creator [_ owner]
  (init-state [_]
    {:text "" :visibility "public" :rsp-ch (chan)})

  (will-mount [_]
    (let [rsp-ch (om/get-state owner :rsp-ch)]
      (go (while true
        (let [res (<! rsp-ch)]
          (case (:status res)
            200 (println "success! clean the textarea!") ; TODO: om/set-state! ...
            404 (println "oops.. something went wrong!") ; TODO: om/set-state! ...
            500 (println "TODO: this shouldn't happen, server must return another error") ; TODO: om/set-state! ...
            (println "...?" res)) ; TODO: om/set-state! ...
    )))))

  (render-state [this {:keys [ch rsp-ch text visibility :as state]}]
    (dom/div
      ; TODO: we need to wire the textarea to our state so on-create-click views the most up to date data
      ; set-state! when the textarea is being edited.. but that's a bit inneficient, no?
      ; OR get value from the node
      (dom/textarea {:rows 3 :ref "text"} text)
      (dom/button {:ref "visibility" :on-click (partial on-create-vis-click owner)} visibility)
      (dom/button {:on-click (partial on-create-click ch rsp-ch owner)} "create!")
    )))




(defn- on-item-vis-click [cursor & evt]
  ; TODO: notify parent channel to change value in server
  ; in response, transact!
  (om/transact! cursor :visibility toggle-visibility)
  )

(defcomponent note-item [{:keys [text date visibility] :as cursor} owner]
  (render-state [this state]
    (dom/li {:class "note"}
      (dom/label {:class "label"} text)
      (dom/span {:class "date"} date)
      (dom/button {:class "visibility" :on-click (partial on-item-vis-click cursor)} visibility)
    )
  ))




(defcomponent notes-list [{:keys [notes] :as data} owner]
  (init-state [_]
    )

  (will-mount [_]
    )

  (render-state [this state]
    (dom/ul {:class "notes"}
      (om/build-all note-item notes))
    )
  )











