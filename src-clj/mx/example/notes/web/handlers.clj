(ns mx.example.notes.web.handlers
  (:require [ring.util.response :refer [response status resource-response]]
            [mx.example.notes.service :as s]
            [mx.bodyguard.utils :refer [get-current-auth set-current-auth del-current-auth]]
            [mx.example.notes.web.enforcer :refer [when-auth-matches coerce-roles coerce-visibility validate-username validate-password validate-roles validate-user-id validate-note-id validate-note-visibility validate-note-text]]))

(defn index [request]
  (resource-response "templates/index.html"))

; user

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} user$post [
  ^{:validate validate-username} username
  ^{:validate validate-password} password
  ^{:coerce coerce-roles :validate validate-roles} roles] ; sign up
  (if-let [user (s/create-user username password roles)]
    (-> (response user)
        (set-current-auth {:user-id (:_id user) :roles (:roles user)}))
    (-> (response "could not create user")
        (status 400))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} user-session$post [username password] ; sign in
  (if-let [user (s/authenticate-user username password)]
    (-> (response user)
        (set-current-auth {:user-id (:_id user) :roles (:roles user)}))
    (-> (response "incorrect username or password")
        (status 404))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} user-session$delete [
  ^{:validate validate-user-id} id
  ^{:name :mx.bodyguard.utils/auth} auth] ; sign out
  ; TODO: you can't just delete everything
  ; del-current-auth has to delete the "current" session
  (let [cur-rsp (response "signed out")
        new-rsp (del-current-auth cur-rsp)]
    new-rsp))

; notes

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} note$post [
  ^{:validate validate-note-text} text
  ^{:coerce coerce-visibility :validate validate-note-visibility} visibility
  ^{:validate validate-user-id} user-id
  ^{:name :mx.bodyguard.utils/auth} auth] ; create note
  (when-auth-matches user-id auth
    (if-let [note (s/create-note user-id text visibility)]
      (response note)
      (-> (response "uh oh, the monkeys broke something")
          (status 500)))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} notes$get [ ; get multiple notes
  ^{:coerce coerce-visibility :validate validate-note-visibility} visibility
  user-id
  ^{:name :mx.bodyguard.utils/auth} auth]
  (case visibility
    :public
      (response (s/get-notes-public)) ; get all (public) notes
    :private
      (when-auth-matches user-id auth
        (response (s/get-notes-user (:user-id auth)))))) ; get all (private) notes

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} note$get [ ; get note by id
  ^{:validate validate-note-id} id
  user-id
  ^{:name :mx.bodyguard.utils/auth} auth]
  (if-let [note (s/get-note id)]
    (case (keyword (:visibility note))
      :private
        (when-auth-matches user-id auth
          (response note))
      :public
        (response note))
    (-> (response "uh oh, what exactly are you looking for?")
        (status 404))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} note$put [ ; update note
  ^{:validate validate-note-id} id
  text
  ^{:coerce coerce-visibility} visibility
  ^{:validate validate-user-id} user-id
  ^{:name :mx.bodyguard.utils/auth} auth]
  (when-auth-matches user-id auth
    (if (not (nil? text))
      (response (s/update-note-text id text)))
    (if (not (nil? visibility))
      (response (s/update-note-visibility id visibility)))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} note$delete [ ; delete note
  ^{:validate validate-note-id} id
  ^{:validate validate-user-id} user-id
  ^{:name :mx.bodyguard.utils/auth} auth]
  (when-auth-matches user-id auth
    (if (s/delete-note id)
      (response {:success :ok :msg "farewell note"})
      (-> (response "uh oh, won't you help a brother out?")
          (status 500)))))
