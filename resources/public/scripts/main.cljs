(ns mx.main
  (:require [secretary.core :as secretary :include-macros true :refer [defroute]]
            [goog.events :as events]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true])
  (:import goog.History
           goog.History.EventType))

(def history (History.))

(def navigation-state (atom [
  {:name "Sign" :path "/sign"}
  {:name "Notes" :path "/notes"}
]))

(defroute "/sign"
  []
  (js/console.log "in sign-in/up"))

(defroute "/notes"
  []
  (js/console.log "in notes"))

(defn- refresh-navigation
  []
  (let [token (.getToken history)
        set-active #(assoc % :active (= (:path %) token))]
    (swap! navigation-state #(map set-active %))))

(defn- on-navigate
  [event]
  (refresh-navigation)
  (secretary/dispatch! (.-token event)))

(doto history
  (goog.events/listen EventType/NAVIGATE on-navigate)
  (.setEnabled true))





(defn- navigation-item-view
  [{:keys [active path name]} owner]
  (reify
  om/IRender
  (render [this]
    (dom/li nil
      (dom/a #js {:href (str "#" path)} (str "[" active "]" " " name))))))

(defn- navigation-view
  [app owner]
  (reify
  om/IRender
  (render [this]
    (apply dom/ul nil
      (om/build-all navigation-item-view app)))))

(om/root
  navigation-view
  navigation-state
  {:target (. js/document (getElementById "navigation"))})
