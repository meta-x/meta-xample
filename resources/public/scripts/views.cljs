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
  (render-state [this state]
    (dom/div
      (om/build note-creator nil {:init-state state})
      (om/build notes-list app)
    ))
  )








