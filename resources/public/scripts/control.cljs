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
    :sign-out "/user/session"
    :sign-up "/user"))

(defn- sign [type method params rsp-ch]
  (go
    (let [url (get-sign-url type)
          {:keys [status body] :as srv-rsp} (<! (method url {:query-params params}))] ; TODO: change "query-params" - I want form-params
      (case status
        200 (put! rsp-ch {:ok? true :user body})
        (put! rsp-ch {:ok? false :error body}))))) ; else, error, notify child

(defn- sign-up [user pass rsp-ch]
  (sign :sign-up http/post {:username user :password pass} rsp-ch))

(defn- sign-in [user pass rsp-ch]
  (sign :sign-in http/post {:username user :password pass} rsp-ch))

(defn- sign-out [user-id rsp-ch]
  (sign :sign-out http/delete {:id user-id} rsp-ch))

(defn get-private-notes [user-id rsp-ch]
  (go
    (let [{:keys [status body]} (<! (http/get "/note" {}))]
      (case status
        200 (put! rsp-ch {:ok? true :notes (reverse body)})
        (put! rsp-ch {:ok? false :error body})))))

(defn get-public-notes [rsp-ch]
  ; TODO: needs backend implementation
  (println "TODO: not implemented")
  )

(defn create-note [user-id text visibility rsp-ch]
  (go
    (let [{:keys [status body]} (<! (http/post "/note" {:query-params {:text text :visibility visibility}}))] ; TODO: change "query-params" - I want form-params
      (case status
        200 (put! rsp-ch {:ok? true :note body})
        (put! rsp-ch {:ok? false :error body})))))

(defn- delete-note [note-id rsp-ch]
  (go
    (let [{:keys [status body]} (<! (http/delete (str "/note/" note-id)))]
      (case status
        200 (put! rsp-ch {:ok? true})
        (put! rsp-ch {:ok? false :error body})))))

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
        (put! rsp-ch {:ok? false :error body})))))

(defn- get-note [note-id rsp-ch]
  (go
    (let [{:keys [status body] :as srv-rsp} (<! (http/get (str "/note/" note-id)))]
      (case status
        200 (put! rsp-ch {:ok? true :note body})
        (put! rsp-ch {:ok? false :error body})))))

;;; server control

(defn init [ch]
  (go (while true
    (let [{:keys [tag rsp-ch] :as data} (<! ch)]
      (case tag
        :sign-up (sign-up (:username data) (:password data) rsp-ch)
        :sign-in (sign-in (:username data) (:password data) rsp-ch)
        :sign-out (sign-out (:user-id data) rsp-ch)
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
