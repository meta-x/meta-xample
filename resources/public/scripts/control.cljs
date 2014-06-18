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


;;; server operations

(defn- sign [ch type user pass]
  (go (let [url (get-sign-url type)
            srv-rsp (<! (http/post url {:query-params {:username user :password pass}}))] ; TODO: change "query-params" - I want form-params
    (case (:status srv-rsp)
      200 (println "done! transition to another page") ; TODO: (put! app-chan ...) or (om/transition! ...) or om/get-shared because app-state is not available
      (put! ch srv-rsp))))) ; else, error, notify child
















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
        :create-note (println "creating note" data)
        :edit-note (println "editing note" data)
        :delete-note (println "deleting note" data)
        (do
          (println "oops" data)
          (put! rsp-ch data))
  )))))



(defn state-tx-listener [{:keys [path old-path-state new-path-state old-global-state new-global-state]} transaction-tag]
  (println "--------------------- a transaction! has occurred!")
  (println path)
  (println old-path-state)
  (println new-path-state)
  (println old-global-state)
  (println new-global-state)
  (println @transaction-tag)
  )



