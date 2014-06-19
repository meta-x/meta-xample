(ns mx.views
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om]
            [om-tools.core :refer-macros [defcomponent]]
            [om-tools.dom :as dom :include-macros true]
            [cljs.core.async :refer [chan <! put!]]
            [mx.components :refer [sign-buttons sign-in-up note-creator notes-list]]
            [cljs-http.client :as http]
  ))

;;; views

(defcomponent index-view [_ _]
  (render-state [_ _]
    (dom/div
      (om/build sign-buttons nil)))
  )



(defcomponent sign-view [_ owner]
  (render-state [_ state]
    (dom/div
      (om/build sign-in-up nil {:init-state state})))
  )



(defcomponent notes-view [app owner]
  (init-state [_]
    {:rsp-ch (chan) :loading true})

  (will-mount [_]
    (let [srv-ch (om/get-shared owner :srv-ch)
          user-id (.getItem js/localStorage :user-id) ; TODO: ew... this should be set in app-state
          rsp-ch (om/get-state owner :rsp-ch)]
      (put! srv-ch {:tag :get-private-notes :rsp-ch rsp-ch :user-id user-id}) ; TODO: do this here? or in init-state? even though it shouldn't be there...
      (go (while true
        (let [{:keys [ok?] :as res} (<! rsp-ch)]
          (case ok?
            true (do
              (om/transact! app :notes #(vec (concat % (:notes res))))
              (om/set-state! owner :loading false))
            false (do
              (println ":(")) ; TODO: set error msg
    ))))))

  (render-state [this {:keys [loading]}]
    ; TODO: retrieving data from the server might fail - make view ready for that
    (dom/div
      (om/build note-creator app)
      (if loading
        (dom/span "Loading...")
        (om/build notes-list app))
    ))
  )
