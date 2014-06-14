(ns mx.example.notes.main
  (:require [ring.middleware.params :refer [wrap-params]]
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

  "/user" {:post #'h/user$post :get #'h/user$get}
  "/user/:id" {:delete #'h/user$delete}

  "/note" {:post #'h/note$post :get #'h/notes$get}
  "/note/:id" {:get #'h/note$get :put #'h/note$put :delete #'h/note$delete}

  "/public/:*" resource-handler
  "/download/:*" file-handler
])
(def routes-tree (create-routes-tree routes))

; ring app

(defn wrap-print-request
  [handler]
  (fn [request]
    (println "------------------ incoming request")
    (println request)
    (handler request)))
(defn wrap-print-response
  [handler]
  (fn [request]
    (let [response (handler request)]
      (println "------------------ outgoing response")
      (println response)
      response)))

(def app
  (->
    routes-tree
    (router-with-tree)
    ;(wrap-enforcer (bind-query-routes routes-tree))
    ;(wrap-print-request)

    (wrap-auth-to-params)
    (wrap-keyword-params)
    (wrap-params)

    ; TODO:
    ; wrap-json-response throws an error if it can't convert things to json
    ; I either need a "softer" way to handle that or something entirely different...
    (wrap-json-response)

  ; (wrap-authorization security-policy)
  ; (wrap-authentication security-policy)
    (wrap-session {:store (cookie-store {:key "16bytekeyforaes!"})})
;    (wrap-print-response)
  ))
