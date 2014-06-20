(ns mx.control
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om]
            [cljs.core.async :refer [chan <! put!]]
            [cljs-http.client :as http]
  ))

;;; server operations

(defn- get-sign-url [type]
  (case type
    :sign-in "/user/session"
    :sign-up "/user"))

(defn- sign [type user pass rsp-ch]
  (go
    (let [url (get-sign-url type)
          srv-rsp (<! (http/post url {:query-params {:username user :password pass}}))] ; TODO: change "query-params" - I want form-params
      (case (:status srv-rsp)
        200 (println "done! transition to another page") ; TODO: (put! app-chan ...) or (om/transition! ...) or om/get-shared because app-state is not available
        (put! rsp-ch srv-rsp))))) ; else, error, notify child

(defn- sign-up [user pass rsp-ch]
  )

(defn- sign-in [user pass rsp-ch]
  )

(defn- sign-out [user-id rsp-ch]
;   (let [user-id (.getItem js/localStorage :user-id)
;         url (str "/user/" user-id)]
;     (DELETE url {:handler #(println "yay")})))
  )

(defn get-private-notes [user-id rsp-ch]
  (go
    (let [{:keys [status body]} (<! (http/get "/note" {}))]
      (case status
        200 (put! rsp-ch {:ok? true :notes (reverse body)})
        (put! rsp-ch {:ok? false :error body})
  ))))

(defn get-public-notes [rsp-ch]
  ; TODO: needs backend implementation
  (println "TODO: not implemented")
  )

(defn create-note [user-id text visibility rsp-ch]
  (go
    (let [{:keys [status body]} (<! (http/post "/note" {:query-params {:text text :visibility visibility}}))] ; TODO: change "query-params" - I want form-params
      (case status
        200 (put! rsp-ch {:ok? true :note body})
        (put! rsp-ch {:ok? false :error body})
  ))))

(defn- delete-note [note-id rsp-ch]
  (go
    (let [{:keys [status body]} (<! (http/delete (str "/note/" note-id)))]
      (case status
        200 (put! rsp-ch {:ok? true})
        (put! rsp-ch {:ok? false :error body})
  ))))

(defn- get-update-note-params [{:keys [note-id text visibility] :as note}]
  (if-not (or (nil? text) (nil? visibility))
    {:text text :visibility visibility}
    (cond
      (not (nil? text)) {:text text}
      (not (nil? visibility)) {:visibility visibility}
      :else {})))

(defn- update-note [{:keys [note-id] :as note} rsp-ch]
  (go
    (let [{:keys [status body]} (<! (http/put (str "/note/" note-id) {:query-params (get-update-note-params note)}))]
      (case status
        200 (put! rsp-ch {:ok? true})
        (put! rsp-ch {:ok? false :error body})
  ))))

(defn- get-note [note-id rsp-ch]
  (go
    (let [{:keys [status body] :as srv-rsp} (<! (http/get (str "/note/" note-id)))]
      (case status
        200 (put! rsp-ch {:ok? true :note body})
        (put! rsp-ch {:ok? false :error body})
  ))))

;;; server control

(defn init [ch]
  (go (while true
    (let [{:keys [tag rsp-ch] :as data} (<! ch)]
      (case tag
        ; TODO: xxx
        :sign-up (println "sign-up" data)
        :sign-in (println "sign-in" data)
        :sign-out (println "sign-out" data)
        :create-note (create-note (:user-id data) (:text data) (:visibility data) rsp-ch)
        :delete-note (delete-note (:note-id data) rsp-ch)
        :update-note (update-note (:note data) rsp-ch)
        :get-note (get-note (:note-id data) rsp-ch)
        :get-private-notes (get-private-notes (:user-id data) rsp-ch)
        :get-public-notes (get-public-notes rsp-ch)
        (do
          (println "oops" data)
          (put! rsp-ch data))
  )))))
