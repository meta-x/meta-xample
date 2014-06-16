(ns mx.main
  (:require [secretary.core :as secretary :include-macros true :refer [defroute]]
            [goog.events :as events]
            [mx.views :refer [index-view sign-view]]
            [om.core :as om :include-macros true]
            )
  (:import goog.History
           goog.History.EventType))

;            [mx.views.index :as mx-index]
;            [mx.views.sign :as mx-sign]
;            [mx.views.notes :as mx-notes]

(enable-console-print!)

;;; the state

(def app-state (atom {}))

;;; om render functions

(defn- render-index
  []
  (println "in index/")
  (om/root index-view app-state {:target (. js/document (getElementById "content"))})
  )

(defn- render-sign
  [in-or-up]
  (println "in sign-in/up")
  (let [data (case in-or-up :sign-in {:label "Sign In" :type :sign-in} :sign-up {:label "Sign Up" :type :sign-up})]
    (om/root sign-view (swap! app-state merge data) {:target (. js/document (getElementById "content"))})
  ))

(defn- render-notes
  []
  (println "in notes")
  )

(defn- render-note
  [id]
  (println "in note/" id)
  )

;;; routing

(def history (History.))

; the routes
(defroute "/" [] (render-index))
(defroute "/sign-in" [] (render-sign :sign-in))
(defroute "/sign-up" [] (render-sign :sign-up))
(defroute "/notes" [] (render-notes))
(defroute "/notes/:id" [id] (render-note id))

; navigation handler
(defn- on-navigate
  [event]
  (secretary/dispatch! (.-token event)))

;;; wiring

; setup om


; setup navigation
(doto history
  (events/listen EventType/NAVIGATE on-navigate)
  (.setEnabled true))
