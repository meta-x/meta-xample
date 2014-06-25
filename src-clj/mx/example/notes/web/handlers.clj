(ns mx.example.notes.web.handlers
  (:require [ring.util.response :refer [response status resource-response]]
            [mx.example.notes.service :as s]
            [mx.bodyguard.utils :refer [get-current-auth set-current-auth del-current-auth]]
            [mx.example.notes.web.enforcer :refer [invalid-auth? coerce-role coerce-visibility validate-username validate-password validate-roles validate-user-id validate-note-id validate-note-visibility validate-note-text]]))

(defn index [request]
  ; TODO: change render strategy into 2 pages
  ; sign in/up page and notes/note page
  ; this requires "refactor" of the SPA
  ;
  ; (if (nil? (get-current-auth request))
  ;   (resource-response "templates/sign.html")
  ;   (resource-response "templates/notes.html")))
    (resource-response "templates/index.html"))

; user

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} user$post [
  ^{:validate validate-username} username
  ^{:validate validate-password} password
  ^{:coerce coerce-roles :validate validate-roles :name "roles[]"} roles] ; sign up
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
  (if-let [invalid-auth (invalid-auth? user-id auth)]
    invalid-auth
    (if-let [note (s/create-note user-id text visibility)]
      (response note)
      (-> (response "uh oh, the monkeys broke something")
          (status 500)))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} notes$get [
  ^{:coerce coerce-visibility :validate validate-note-visibility} visibility
  ^{:validate validate-user-id} user-id
  ^{:name :mx.bodyguard.utils/auth} auth]
  (case visibility
    :public
      (response (s/get-notes-public)) ; get all (public) notes
    :private
      (if-let [invalid-auth (invalid-auth? user-id auth)]
        invalid-auth
        (response (s/get-notes-user (:user-id auth)))))) ; get all (private) notes

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} note$get [
  ^{:validate validate-note-id} id] ; get note by id
  ; TODO: this handler should validate authorization
  (if-let [note (s/get-note id)]
    (response note)
    (-> (response "uh oh, what exactly are you looking for?")
        (status 404))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} note$put [
  ^{:validate validate-note-id} id
  text
  ^{:coerce coerce-visibility} visibility] ; update note
  ; TODO: this handler should validate authorization
  (if (not (nil? text))
    (response (s/update-note-text id text)))
  (if (not (nil? visibility))
    (response (s/update-note-visibility id visibility))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} note$delete [
  ^{:validate validate-note-id} id] ; delete note
  ; TODO: this handler should validate authorization
  (if (s/delete-note id)
    (response {:success :ok :msg "farewell note"})
    (-> (response "uh oh, won't you help a brother out?")
        (status 500))))

; TODO: AOP for validating things
; maybe a pre-execute option in metadata or route definition?
; functions should throw an exception or an error response
; this becomes very similar to liberator's model of execution
