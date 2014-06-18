(ns mx.main
  (:require [secretary.core :as secretary :include-macros true :refer [defroute]]
            [goog.events :as events]
            [om.core :as om :include-macros true]
            [cljs.core.async :refer [chan]]
            [mx.control :as srv-control]
            [mx.views :refer [index-view sign-view notes-view]]
  )
  (:import goog.History
           goog.History.EventType))

(enable-console-print!)

;;; the state

(def app-state (atom {
    :notes [{:text "note 0!" :date "2014-06-17" :visibility "public"}
            {:text "note 1!" :date "2014-06-17" :visibility "public"}
            {:text "note 2!" :date "2014-06-17" :visibility "public"}
            {:text "note 3!" :date "2014-06-17" :visibility "public"}
            {:text "note 4!" :date "2014-06-17" :visibility "public"}
            {:text "note 5!" :date "2014-06-17" :visibility "public"}
            {:text "note 6!" :date "2014-06-17" :visibility "public"}
            {:text "note 7!" :date "2014-06-17" :visibility "public"}
            {:text "note 8!" :date "2014-06-17" :visibility "public"}
            {:text "note 9!" :date "2014-06-17" :visibility "public"}
            {:text "note 10!" :date "2014-06-17" :visibility "public"}]
  }))

(def srv-ch (chan))

;;; om render functions

(defn- render-index []
  (om/root
    index-view
    app-state
    {:target (. js/document (getElementById "content"))
     :shared {:srv-ch srv-ch}
     :tx-listen srv-control/state-tx-listener
    }))

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
     :tx-listen srv-control/state-tx-listener
     :init-state (get-sign-data in-or-up)
    }))

(defn- render-notes []
  (om/root
    notes-view
    app-state
    {:target (. js/document (getElementById "content"))
     :shared {:srv-ch srv-ch}
     :tx-listen srv-control/state-tx-listener
    }))

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
