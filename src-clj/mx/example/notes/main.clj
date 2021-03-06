(ns mx.example.notes.main
  (:require [environ.core :refer [env]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.util.response :refer [response]]

            [mx.paths.core :refer [create-routes-tree bind-query-routes-tree router-with-tree resource-handler file-handler]]
            [mx.enforcer.middleware :refer [wrap-enforcer]]
            [mx.bodyguard.auth :refer [wrap-authorization wrap-authentication wrap-auth-to-params]]

            [ring.middleware.session :refer [wrap-session]]
            [ring.middleware.session.cookie :refer [cookie-store]]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]

            [mx.example.notes.web.handlers :as h]
            [mx.example.notes.web.bodyguard :refer [security-policy]]
    ))

; PATHS - routes definition

(def routes [
  "/" {:get #'h/index}

  "/user" {:post #'h/user$post}
  "/user/session" {:post #'h/user-session$post :delete #'h/user-session$delete}

  "/note" {:post #'h/note$post :get #'h/notes$get}
  "/note/:id" {:get #'h/note$get :put #'h/note$put :delete #'h/note$delete}

  "/public/:*" resource-handler
  "/download/:*" file-handler
])
(def routes-tree (create-routes-tree routes))

; ring app

(defn wrap-print-request [handler]
  (fn [request]
    (println "------------------ incoming request")
    (println request)
    (handler request)))
(defn wrap-print-response [handler]
  (fn [request]
    (let [response (handler request)]
      (println "------------------ outgoing response")
      (println response)
      response)))

(def app
  (->
    routes-tree
    (router-with-tree)
    ;(wrap-print-request)
    (wrap-enforcer (bind-query-routes-tree routes-tree))

    (wrap-auth-to-params)
    (wrap-keyword-params)
    (wrap-params)

    (wrap-json-response)

    (wrap-authorization security-policy)
    (wrap-authentication security-policy)
    (wrap-session {:store (cookie-store {:key (env :cookiestore-key)})})
;    (wrap-print-response)
  ))

; TODO:
; - add a msg in the initial view of the goal of this project
; - add a link to a downloadable file...
