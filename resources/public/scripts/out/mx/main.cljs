(ns mx.main
  (:require [secretary.core :as secretary :include-macros true :refer [defroute]]
            [goog.events :as events]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true])
  (:import goog.History
           goog.History.EventType))

(def history (History.))

(def navigation-state
  (atom [{:name "Sign" :path "/sign"}
         {:name "Notes" :path "/notes"}]))

(defroute "/sign"
  []
  (js/console.log "in sign-in/up"))

(defroute "/notes"
  []
  (js/console.log "in notes"))

(defn refresh-navigation
  []
  (let [token (.getToken history)
        set-active #(assoc % :active (= (:path %) token))]
    (swap! navigation-state #(map set-active %))))

(defn on-navigate
  [event]
  (refresh-navigation)
  (secretary/dispatch! (.-token event)))

(doto history
  (goog.events/listen EventType/NAVIGATE on-navigate)
  (.setEnabled true))
















