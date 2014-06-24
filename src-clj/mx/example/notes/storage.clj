(ns mx.example.notes.storage
  (:require [environ.core :refer [env]]
            [monger.core :refer [connect-via-uri disconnect]]
            [monger.collection :refer [ensure-index insert-and-return save-and-return remove-by-id find-maps find-one-as-map]]
            [monger.result :refer [ok?]]
            [monger.joda-time]
            [clj-time.core :refer [now]])
  (:import [org.bson.types ObjectId]))

(def mongo-uri (env :mongo-uri))
(def collection-users "users")
(def collection-notes "notes")

; setup

(defn setup [] ; ATTN: this must be executed when using a new database
  (let [{:keys [conn db]} (connect-via-uri mongo-uri)]
    (ensure-index db collection-users (array-map :username 1) {:unique true})))

; users

(defn user-create [username password roles]
  (let [{:keys [conn db]} (connect-via-uri mongo-uri)]
    (try
      (insert-and-return db collection-users {
        :_id (str (ObjectId.))
        :username username
        :password password
        :roles roles
      })
    (finally (disconnect conn)))))

(defn- user-retrieve [fltr]
  (let [{:keys [conn db]} (connect-via-uri mongo-uri)]
    (try
      (find-one-as-map db collection-users fltr)
    (finally (disconnect conn)))))

(defn user-retrieve-by-id [user-id]
  (user-retrieve {:_id user-id}))

(defn user-retrieve-by-name [username]
  (user-retrieve {:username username}))

; notes

(defn note-create
  ([user-id text]
    (note-create user-id text :private))
  ([user-id text visibility]
    (let [{:keys [conn db]} (connect-via-uri mongo-uri)]
      (try
        (insert-and-return db collection-notes {
          :_id (str (ObjectId.))
          :user user-id
          :date (now)
          :text text
          :visibility visibility
        })
      (finally (disconnect conn))))))

(defn note-retrieve [note-id]
  (let [{:keys [conn db]} (connect-via-uri mongo-uri)]
    (try
      (find-one-as-map db collection-notes {:_id note-id})
    (finally (disconnect conn)))))

(defn- notes-retrieve [fltr]
  (let [{:keys [conn db]} (connect-via-uri mongo-uri)]
    (try ; find-maps is lazy, must enforce it
      (doall (find-maps db collection-notes fltr))
    (finally (disconnect conn)))))

(defn notes-retrieve-user [user-id]
  (notes-retrieve {:user user-id}))

(defn notes-retrieve-public []
  (notes-retrieve {:visibility :public}))

(defn- note-update-field [note-id field-name field-value]
  (let [{:keys [conn db]} (connect-via-uri mongo-uri)]
    (try
      (if-let [old-note (find-one-as-map db collection-notes {:_id note-id})]
        (->>
          (assoc old-note field-name field-value)
          (save-and-return db collection-notes)))
    (finally (disconnect conn)))))

(defn note-update-text [note-id text]
  (note-update-field note-id :text text))

(defn note-update-visibility [note-id visibility]
  (note-update-field note-id :visibility visibility))

(defn note-delete [note-id]
  (let [{:keys [conn db]} (connect-via-uri mongo-uri)]
    (try
      (-> (remove-by-id db collection-notes note-id)
          (ok?))
    (finally (disconnect conn)))))
