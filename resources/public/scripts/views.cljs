(ns mx.views
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [chan <!]]
            [mx.components :refer [sign-buttons sign-in-up]]))

;;; views

(defn index-view
  [data owner]
  (reify
    om/IInitState
    (init-state [_]
      {:ch (chan)})

    om/IWillMount
    (will-mount [_]
      (let [ch (om/get-state owner :ch)]
        (go (loop []
          (let [button (<! ch)]
            (case button
              :sign-in (println "sign in!")
              :sign-up (println "sign up!"))
            (recur))))))

    om/IRenderState
    (render-state [this {:keys [ch]}]
      (dom/div nil
        (om/build sign-buttons {:ch ch})
      ;(dom/div nil (om/build public-notes ...))
    ))))


(defn sign-view
  [data owner]
  (reify
    om/IInitState
    (init-state [_]
      {:ch (chan) :label (:label data) :type (:type data)})

    om/IWillMount
    (will-mount [_]
      (let [ch (om/get-state owner :ch)]
        (go (loop []
          (let [data (<! ch)]
            (println "button was ... " data)
            (println (-> (om/get-node (nth data 1) "username")
                         .-value))
            (println (-> (om/get-node (nth data 1) "password")
                         .-value))
            (recur))))))

    om/IRenderState
    (render-state [this state]
      (dom/div nil
        (om/build sign-in-up state)
      ;(dom/div nil (om/build public-notes ...))
    ))))











