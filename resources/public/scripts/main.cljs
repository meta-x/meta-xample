(ns mx.main
  (:require [secretary.core :as secretary :include-macros true :refer [defroute]]
            [goog.events :as events]
            [om.core :as om :include-macros true]
            [cljs.core.async :refer [chan]]
            [mx.control :as srv-control]
            [mx.views :refer [index-view sign-view notes-view note-view]]
  )
  (:import goog.History
           goog.History.EventType))

; TODO: v2
; add support for http://quilljs.com/

(enable-console-print!)

;;; the state

(def app-state (atom {
    :authenticated false
  }))

(def srv-ch (chan))

;;; om render functions

(defn- render-index []
  (om/root
    index-view
    app-state
    {:target (. js/document (getElementById "content"))
     :shared {:srv-ch srv-ch}
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
     :init-state (get-sign-data in-or-up)
    }))

(defn- render-notes []
  (om/root
    notes-view
    app-state
    {:target (. js/document (getElementById "content"))
     :shared {:srv-ch srv-ch}
    }))

(defn- render-note [id]
  (om/root
    note-view
    app-state
    {:target (. js/document (getElementById "content"))
     :shared {:srv-ch srv-ch}
     :init-state {:note-id id}
    }))

;;; routing

(def history (History.))

; the routes
(defroute "/" [] (render-index))
(defroute "/sign-in" [] (render-sign :sign-in))
(defroute "/sign-up" [] (render-sign :sign-up))
(defroute "/notes" [] (render-notes))
(defroute "/notes/:id" [id] (render-note id))

;;; wiring

; TODO: create app-level component that manages view transitions? (this)

; setup server controller
(srv-control/init srv-ch)

; secretary's navigation handler
(defn- on-navigate
  [event]
  (secretary/dispatch! (.-token event)))

; init navigation
(doto history
  (events/listen EventType/NAVIGATE on-navigate)
  (.setEnabled true))
