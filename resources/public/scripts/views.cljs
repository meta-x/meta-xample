(ns mx.views
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om]
            [om-tools.core :refer-macros [defcomponent]]
            [om-tools.dom :as dom :include-macros true]
            [cljs.core.async :refer [chan <! put!]]
            [mx.components :refer [sign-buttons sign-in-up note-creator notes-list]]
            [cljs-http.client :as http]
  ))

;;; helpers

(defn- get-sign-url [type]
  (case type
    :sign-in "/user/session"
    :sign-up "/user"))



;;; views

(defcomponent index-view [_ owner]
  (init-state [_]
    {:ch (chan)})

  (will-mount [_]
    (let [comp-ch (om/get-state owner :ch)]
      (go (while true
        (let [button (<! comp-ch)]
          (case button
            ; TODO: transition to another page
            :sign-in (println "sign in!")
            :sign-up (println "sign up!"))
    )))))

  (render-state [this state]
    (dom/div
      (om/build sign-buttons nil {:init-state state})))
  )

(defcomponent sign-view [_ owner]
  (init-state [_]
    {:ch (chan)})

  (will-mount [_]
    (let [comp-ch (om/get-state owner :ch)]
      (go (while true
        (let [[type user pass] (<! comp-ch)
              url (get-sign-url type)
              srv-rsp (<! (http/post url {:query-params {:username user :password pass}}))] ; TODO: change "query-params", that's not what I want
          (case (:status srv-rsp)
            200 (println "done! transition to another page") ; TODO: (put! app-chan ...) or (om/transition! ...) on om/get-shared because app-state is not available
            (put! comp-ch srv-rsp)) ; else, error, notify child
    )))))

  (render-state [this state]
    (dom/div
      (om/build sign-in-up nil {:init-state state})))
  )

(defcomponent notes-view [app owner]
  (init-state [_]
    {:ch (chan)})

  (will-mount [_]
    (let [ch (om/get-state owner :ch)]
      (go (while true
        (let [res (<! ch)
              {:keys [tag rsp-ch]} res]
          (put! rsp-ch "hey")
    )))))

  (render-state [this state]
    (dom/div
      (om/build note-creator nil {:init-state state})
      (om/build notes-list app)
    ))
  )








