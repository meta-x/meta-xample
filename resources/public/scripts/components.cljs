(ns mx.components
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put!]])
  )

;;; components

(defn sign-buttons
  [data owner]
  (reify
    om/IInitState
    (init-state [this]
      {:ch (:ch data)})

    om/IRenderState
    (render-state [this {:keys [ch] :as state}]
      (dom/div nil
        (dom/button #js {:onClick #(put! ch :sign-in)} "Sign In")
        (dom/button #js {:onClick #(put! ch :sign-up)} "Sign Up")
      )
    )))


(defn on-click-handler
  [evt]

  )

(defn sign-in-up
  [data owner]
  (reify
    om/IRenderState
    (render-state [this state]
      (dom/div nil
        (dom/input #js {:placeholder "username" :ref "username"})
        (dom/input #js {:placeholder "password" :ref "password"})
        (dom/button #js {:onClick #(put! (:ch data) [(:type data) owner])} (:label data))
      )
    )))














