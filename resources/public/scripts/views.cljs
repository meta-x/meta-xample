(ns mx.views
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om]
            [om-tools.core :refer-macros [defcomponent]]
            [om-tools.dom :as dom :include-macros true]
            [cljs.core.async :refer [chan <! put!]]
            [mx.components :refer [sign-buttons sign-in-up note-creator notes-list note-item]]
            [cljs-http.client :as http]
  ))

;;; views

(defcomponent index-view [_ _]
  (render-state [_ _]
    (dom/div
      (om/build sign-buttons nil)))) ; TODO: maybe it's a good idea to pass app, if app includes ":current-view"

(defcomponent sign-view [_ owner]
  (render-state [_ state]
    (dom/div
      (om/build sign-in-up nil {:init-state state})))) ; TODO: maybe it's a good idea to pass app, if app includes ":current-view"

(defcomponent notes-view [app owner]
  (render-state [this {:keys [loading evt-ch]}]
    (dom/div
      (om/build note-creator app)
      (om/build notes-list app))))

(defn- get-note [app owner]
  (let [srv-ch (om/get-shared owner :srv-ch)
        note-id (om/get-state owner :note-id)
        rsp-ch (chan)]
    (put! srv-ch {:tag :get-note :rsp-ch rsp-ch :note-id note-id})
    (go (while true
      (let [{:keys [ok? note] :as res} (<! rsp-ch)]
        (case ok?
          true (do
            (om/transact! app :notes #(vector note)) ; be evil: replace notes with [note]
            (om/set-state! owner :loading false))
          false (do
            (println ":(")) ; TODO: set error msg / click here to try again, etc
  ))))))

(defn- destroy-note [app owner]
  (let [evt-ch (om/get-state owner :evt-ch)]
    (go (while true
      (let [[evt cursor] (<! evt-ch)]
        (case evt
          :destroy (println "go back to /#/notes")
          (println "else!"))
  )))))

(defcomponent note-view [app owner]
  (init-state [_]
    {:loading true :evt-ch (chan)})

  (will-mount [_]
    (get-note app owner)
    (destroy-note app owner))

  (render-state [this {:keys [loading note-id evt-ch] :as state}]
    (dom/div
      (if loading
        (dom/span (str "Loading... "))
        (om/build note-item (first (filter #(= (:_id %) note-id) (:notes app))) {:init-state {:evt-ch evt-ch}}))
  )))
