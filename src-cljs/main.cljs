(ns mx.main
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [secretary.core :as secretary :include-macros true :refer [defroute]]
            [goog.events :as events]
            [om.core :as om :include-macros true]
            [om-tools.core :refer-macros [defcomponent]]
            [om-tools.dom :as dom :include-macros true]
            [cljs.core.async :refer [chan <!]]
            [mx.control :as srv-control]
            [mx.views :refer [index-view sign-view notes-view note-view]])
  (:import goog.History
           goog.History.EventType))

; TODO: v2
; add support for http://quilljs.com/

(enable-console-print!)

;;; the state
(def app-state (atom { ; application state
    :current-view :index ; used to transition between "pages"
    :current-view-state nil
    :authenticated? false
    :username nil
    :user-id nil
    :notes []
  }))

;;; routing
(def history (History.))

; the routes
(defn set-current-view! [v & s]
  (swap! app-state assoc :current-view v)
  (swap! app-state assoc :current-view-state (first s))
  )

; TODO: routing is still fucked up (next/previous and reloading)
(defroute "/" [] (set-current-view! :index))
(defroute "/sign-in" [] (set-current-view! :sign-in))
(defroute "/sign-up" [] (set-current-view! :sign-up))
(defroute "/notes" []   (set-current-view! :notes))
(defroute "/notes/:id" [id] (set-current-view! :note {:note-id id}))
(defroute "*" [] (set-current-view! :404))

; secretary's navigation handler
(defn on-navigate [event]
  (secretary/dispatch! (.-token event)))

; init navigation
(doto history
  (events/listen EventType/NAVIGATE on-navigate)
  (.setEnabled true))

;;; the om app
(defn render-page [view {:keys [authenticated?] :as app} protect? & initial-state]
  (if (and protect? (not authenticated?))
    (om/build index-view app)
    (om/build view app {:init-state (first initial-state)})))

(defn next-view [evt]
  ; state machine for defining the next page view to render
  (case evt
    :sign-in :notes
    :sign-up :notes
    :sign-out :index
    :note-delete :notes))

(defcomponent teh-app [{:keys [current-view current-view-state] :as app} owner]
  (will-mount [_]
    (go (while true
      (let [app-ch (om/get-shared owner :app-ch)
            {:keys [evt args] :as data} (<! app-ch)]
        (set-current-view! (next-view evt) args)
  ))))

  (render-state [_ state]
    (case current-view ; TODO: there's still a bug with a mismatch between current-view and location.href
      :index (render-page index-view app false)
      :sign-in (render-page sign-view app false {:label "Sign In" :type :sign-in})
      :sign-up (render-page sign-view app false {:label "Sign Up" :type :sign-up})
      :notes (render-page notes-view app true)
      ; current-view-state is a cursor! since we can't deref it in render, we need to do this *argh*
      :note (render-page note-view app false {:note-id (:note-id current-view-state)})
      (dom/div "404") ; TODO: 404
  )))

;;; wiring
(let [srv-ch (chan) ; shared channel used to communicate with the server-control module
      app-ch (chan)] ; shared channel used to communicate upstream with the app component
  (om/root
    teh-app
    app-state
    {:target (. js/document (getElementById "content"))
     :shared {:srv-ch srv-ch :app-ch app-ch}
     :init-state {:app-ch app-ch}})

  ; setup server controller
  (srv-control/init srv-ch))
