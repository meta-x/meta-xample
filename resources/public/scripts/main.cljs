(ns mx.main
  (:require [secretary.core :as secretary :include-macros true :refer [defroute]]
            [goog.events :as events]
            [mx.views :refer [index-view sign-view notes-view]]
            [mx.control :as srv-control]
            [om.core :as om :include-macros true]
            [cljs.core.async :refer [chan]]
  )
  (:import goog.History
           goog.History.EventType))

(enable-console-print!)

;;; the state

(def app-state (atom {
    :notes [{:text "hi wo!" :date "2014-06-17" :visibility "public"}]
  }))

(def srv-ch (chan))

;;; om render functions

(defn- render-index []
  (om/root
    index-view
    app-state
    {:target (. js/document (getElementById "content"))
     :shared {:srv-ch srv-ch}
     :tx-listen control/state-change-listener}
  ))

(def sign-in-data {:label "Sign In" :type :sign-in})
(def sign-up-data {:label "Sign Up" :type :sign-up})
(defn- get-sign-data [in-or-up]
  (case in-or-up
    :sign-in sign-in-data
    :sign-up sign-up-data))

(defn- render-sign [in-or-up]
  (om/root
    sign-view
    app-state
    {:target (. js/document (getElementById "content"))
     :shared {:srv-ch srv-ch}
     :tx-listen control/state-change-listener
     :init-state (get-sign-data in-or-up)}
  ))

(defn- render-notes []
  (om/root
    notes-view
    app-state
    {:target (. js/document (getElementById "content"))
     :tx-listen control/state-change-listener
     :shared {:srv-ch srv-ch}}
  ))

(defn- render-note [id]
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

; TODO: create app-level component that manages view transitions? (this)

(srv-control/init srv-ch)



; setup om

; setup navigation
(doto history
  (events/listen EventType/NAVIGATE on-navigate)
  (.setEnabled true))
