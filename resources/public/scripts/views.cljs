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
