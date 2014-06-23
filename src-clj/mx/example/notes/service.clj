(ns mx.example.notes.service
  (:require [mx.example.notes.storage :as storage]
            [mx.bodyguard.utils :refer [bcrypt-hash bcrypt-verify]]))

; TODO: catch exceptions and normalize errors

; user

(defn- format-user-roles
  [user]
  (->>
    (:roles user)
    (map #(keyword %))
    (set)
    (assoc user :roles)))

(defn create-user
  [username password roles]
  (-> (storage/user-create username (bcrypt-hash password) roles)
      (dissoc :password)))

(defn authenticate-user
  [username password]
  (if-let [user (storage/user-retrieve-by-name username)]
    (if (bcrypt-verify password (:password user))
      (-> (dissoc user :password)
          (format-user-roles)))))

; note

(defn create-note
  ([user-id text]
    (storage/note-create user-id text))
  ([user-id text visibility]
   (storage/note-create user-id text visibility)))

(defn get-notes-public
  []
  (storage/notes-retrieve-public))

(defn get-notes-user
  [user-id]
  (storage/notes-retrieve-user user-id))

(defn get-note
  [note-id]
  (storage/note-retrieve note-id))

(defn update-note-text
  [note-id text]
  {:success (storage/note-update-text note-id text)})

(defn update-note-visibility
  [note-id visibility]
  {:success (storage/note-update-visibility note-id visibility)})

(defn delete-note
  [note-id]
  (storage/note-delete note-id))
