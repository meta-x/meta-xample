(ns mx.control
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om]
            [cljs.core.async :refer [chan <! put!]]
            [cljs-http.client :as http]
  ))

;;; helpers

(defn- get-sign-url [type]
  (case type
    :sign-in "/user/session"
    :sign-up "/user"))


(defn- reply [ch ]

  )

(defn- srv-op []

  )

; (defn mutate-and-put! [op ch state k v]
;   (op state k v)
;   (put! ch {k v})
;   )

;;; server operations

; TODO: fix signatures

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
    (let [srv-ch (http/get "/note" {})
          {:keys [status body]} (<! srv-ch)]
      (case status
        200 (put! rsp-ch {:ok? true :notes (reverse body)})
        401 (put! rsp-ch {:ok? false})
        (println "hmz") ; TODO: define return value {:ok? true/false :}
  ))))



; (defn get-public-notes
;   []
;   ; TODO: implement backend
;   )



(defn create-note [user-id text visibility rsp-ch]
  (go
    ; TODO: change "query-params" - I want form-params
    (let [srv-rsp (<! (http/post "/note" {:query-params {:text text :visibility visibility}}))]
      (case (:status srv-rsp)
        200 (put! rsp-ch {:ok? true :note (:body srv-rsp)})
        (println "uh oh, note not created!" srv-rsp) ; (put! rsp-ch (:body srv-rsp)) ; TODO: parse this..
  ))))



; (defn- delete-note [target]
;   (let [elem (js->clj (.-currentTarget target))
;         parent (.-parentNode elem)]
;     (DELETE (str "/note/" (attr parent :data-id)) {
;       :params {}
;       :handler #(remove! parent) ; TODO: Uncaught TypeError: Cannot read property 'removeChild' of null
;       :error-handler #(println %) ; TODO: set some error msg
;       :format :raw
;     })))



(defn- get-update-note-params [{:keys [note-id text visibility] :as note}]
  (if-not (or (nil? text) (nil? visibility))
    {:text text :visibility visibility}
    (cond
      (not (nil? text)) {:text text}
      (not (nil? visibility)) {:visibility visibility}
      :else {})))

(defn- update-note [{:keys [note-id] :as note} rsp-ch]
  (go
    (let [srv-ch (http/put (str "/note/" note-id) {:query-params (get-update-note-params note)})
          {:keys [status body]} (<! srv-ch)]
      (case status
        200 (put! rsp-ch {:ok? true})
        401 (put! rsp-ch {:ok? false})
        (println "hmz") ; TODO: define return value {:ok? true/false :}
  ))))







;;; server control

(defn init [ch]
  (go (while true
    (let [data (<! ch)
          {:keys [tag rsp-ch]} data]
      (case tag
        ; TODO: xxx
        :sign-up (println "sign-up" data)
        :sign-in (println "sign-in" data)
        :sign-out (println "sign-out" data)
        :create-note (create-note (:user-id data) (:text data) (:visibility data) rsp-ch)
        :edit-note (println "editing note" data)
        :delete-note (println "deleting note" data)
        :update-note (update-note (:note data) rsp-ch)
        :get-private-notes (get-private-notes (:user-id data) rsp-ch)
        :get-public-notes (println "retrieving public notes" data)
        (do
          (println "oops" data)
          (put! rsp-ch data))
  )))))


