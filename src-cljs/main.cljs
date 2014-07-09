(ns mx.main
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [secretary.core :as secretary :include-macros true :refer [defroute]]
            [goog.events :as events]
            [om.core :as om :include-macros true]
            [om-tools.core :refer-macros [defcomponent]]
            [om-tools.dom :as dom :include-macros true]
            [cljs.core.async :refer [chan <!]]
            [mx.server :as server]
            [mx.pages :refer [index-view sign-view notes-view note-view]])
  (:import goog.History
           goog.History.EventType))

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
  (swap! app-state assoc :current-view-state (first s)))

(defroute r-index "/" [] (set-current-view! :index))
(defroute r-sign-in "/sign-in" [] (set-current-view! :sign-in))
(defroute r-sign-up "/sign-up" [] (set-current-view! :sign-up))
(defroute r-notes "/notes" []   (set-current-view! :notes))
(defroute r-note "/notes/:id" [id] (set-current-view! :note {:note-id id}))
(defroute r-404 "*" [] (set-current-view! :404))

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
    (om/build index-view app) ; default view for protected pages when user is not authed | TODO: ideally you'd set some message
    (om/build view app {:init-state (first initial-state)})))

(defn next-route [evt]
  ; state machine for defining the next page view to render
  ; returns the named route for the next view
  ; TODO: this is awful. it's assuming there's only one next alternative
  ; that can be achieved by having :p1-1, :p1-2 but it's just awful
  (case evt
    :sign-in r-notes
    :sign-up r-notes
    :sign-out r-index
    :note-delete r-notes))

(defcomponent teh-app [{:keys [current-view current-view-state] :as app} owner]
  ; this component is responsible for deciding what to render - complements secretary

  (will-mount [_]
    (let [app-ch (om/get-shared owner :app-ch)]
      (go (while true
        (let [{:keys [evt args] :as data} (<! app-ch)
              next-route (next-route evt)
              next-url (next-route args)]
          ; changing the app's "context" (i.e. url+view) from within
          ; i.e. an internal event is requesting a change
          (set! (.-hash js/window.location) next-url)
    )))))

  (render-state [_ state]
    (case current-view
      :index (render-page index-view app false)
      :sign-in (render-page sign-view app false {:label "Sign In" :type :sign-in})
      :sign-up (render-page sign-view app false {:label "Sign Up" :type :sign-up})
      :notes (render-page notes-view app true)
      ; current-view-state is a cursor! since we can't deref it in render, we need to do this *argh*
      :note (render-page note-view app false {:note-id (:note-id current-view-state)})
      (dom/div "404") ; TODO: 404
  )))

;;; wiring
(let [srv-ch (chan) ; shared channel used to communicate with the server module
      app-ch (chan)] ; shared channel used to communicate upstream with the app component
  (om/root
    teh-app
    app-state
    {:target (. js/document (getElementById "content"))
     :shared {:srv-ch srv-ch :app-ch app-ch}})

  ; setup server controller
  (server/init! srv-ch))
