(ns mx.pages
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om]
            [om-tools.core :refer-macros [defcomponent]]
            [om-tools.dom :as dom :include-macros true]
            [cljs.core.async :refer [chan <! put!]]
            [mx.views :refer [sign-buttons sign-out-button sign-in-up note-creator notes-list note-item]]))

;;; page components

(defcomponent index-view [app _]
  (render-state [_ _]
    (dom/div
      (om/build sign-buttons app)))
  )

(defcomponent sign-view [app owner]
  ; TODO: back button / !sign
  (render-state [_ state]
    (dom/div
      (om/build sign-in-up app {:init-state state})))
  )

(defcomponent notes-view [app owner]
  ; TODO: link to index
  ; TODO: signed in as ...
  (render-state [_ _]
    (dom/div
      (om/build note-creator app)
      (om/build notes-list app)))
  )

(defn- get-note [{:keys [user-id] :as app} owner]
  (let [srv-ch (om/get-shared owner :srv-ch)
        note-id (om/get-state owner :note-id)
        rsp-ch (chan)]
    (put! srv-ch {:tag :get-note :rsp-ch rsp-ch :note-id note-id :user-id user-id})
    (go (while true
      (let [{:keys [ok? note] :as res} (<! rsp-ch)]
        (case ok?
          true (do
            (om/transact! app :notes #(vector note)) ; be evil: replace notes with [note]
            (om/set-state! owner :loading false))
          false (do
            (println ":(")) ; TODO: set error msg / click here to try again, etc
  ))))))

(defn- destroy-note [owner]
  (let [evt-ch (om/get-state owner :evt-ch)]
    (go (while true
      (let [[evt cursor] (<! evt-ch)]
        (case evt
          :destroy (put! (om/get-shared owner :app-ch) {:evt :note-delete})
          (println "else!"))
  )))))

(defcomponent note-view [{:keys [user-id] :as app} owner]
  (init-state [_]
    {:loading true :evt-ch (chan)})

  (will-mount [_]
    (get-note app owner)
    (destroy-note owner))

  (render-state [this {:keys [loading note-id evt-ch] :as state}]
    ; TODO: link to notes
    (dom/div
      (if loading
        (dom/span (str "Loading... "))
        (om/build note-item (first (filter #(= (:_id %) note-id) (:notes app))) {:init-state {:evt-ch evt-ch :user-id user-id}}))
  )))
