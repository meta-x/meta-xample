(ns mx.control
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [om.core :as om]
            [cljs.core.async :refer [chan <! put!]]
            [cljs-http.client :as http]
  ))

(defn- reply [ch ]

  )

(defn- srv-op []

  )

(defn init [ch]
  (go (while true
    (let [data (<! ch)
          {:keys [tag rsp-ch]} data]
      (case tag
        :sign-up (println "sign-up")
        :sign-in (println "sign-in")
        :sign-out (println "sign-out")
        :create-note (println "creating note")
        :edit-note (println "editing note")
        :delete-note (println "deleting note")
      )))))



(defn state-change-listener [{:keys [path old-path-state new-path-state old-global-state new-global-state]} transaction-tag]
  (println "a transaction! has occurred!")
  )





