(ns mx.example.notes.web.handlers
  (:require [ring.util.response :refer [response status resource-response]]
            [mx.example.notes.service :as s]
            [mx.bodyguard.utils :refer [get-current-auth set-current-auth del-current-auth]]
            [mx.example.notes.web.enforcer :as efc]))

; TODO: in the handlers that require the user-id, it should not be extracted from the auth, but explicitely sent and used
; auth-obj will be used bodyguard (???) and it should not be assumed that all strategies will have the user-id present in auth-obj
; auth-obj can simply contain the auth-token or whatever...

(defn index [request]
  ; TODO: change render strategy into 2 pages
  ; sign in/up page and notes/note page
  ; (if (nil? (get-current-auth request))
  ;   (resource-response "templates/sign.html")
  ;   (resource-response "templates/notes.html")))
    (resource-response "templates/index.html"))

; user

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} user$post [
  ^{:validate efc/validate-username} username
  ^{:validate efc/validate-password} password
  ^{:validate efc/validate-roles :name "roles[]"} roles] ; sign up
  (if-let [user (s/create-user username password roles)]
    (-> (response user)
        (set-current-auth {:user-id (:_id user) :roles (:roles user)}))
    (-> (response "could not create user")
        (status 400))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} user-session$post [
  ^{:validate efc/validate-username} username
  ^{:validate efc/validate-password} password] ; sign in
  (if-let [user (s/authenticate-user username password)]
    (-> (response user)
        (set-current-auth {:user-id (:_id user) :roles (:roles user)}))
    (-> (response "incorrect username or password")
        (status 404))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} user-session$delete [
  ^{:validate efc/validate-user-id} id
  ^{:name :mx.bodyguard.utils/auth} auth] ; sign out
  ; TODO: you can't just delete everything
  ; del-current-auth has to delete the "current" session
  (let [cur-rsp (response "signed out")
        new-rsp (del-current-auth cur-rsp)]
    new-rsp))

; notes

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} note$post [
  ^{:validate efc/validate-note-text} text
  ^{:validate efc/validate-note-visibility} visibility
  ^{:name :mx.bodyguard.utils/auth} auth] ; create note
  (if-let [note (s/create-note (:user-id auth) text visibility)]
    (response note)
    (-> (response "uh oh, the monkeys broke something")
        (status 500))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} notes$get
  ; ([]
  ;   (s/get-notes-public)) ; get all (public) notes
  ([^{:name :mx.bodyguard.utils/auth} auth]
    (response (s/get-notes-user (:user-id auth))))) ; get all (private) notes

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} note$get [
  ^{:validate efc/validate-note-id} id] ; get note by id
  (if-let [note (s/get-note id)]
    (response note)
    (-> (response "uh oh, what exactly are you looking for?")
        (status 404))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} note$put [
  ^{:validate efc/validate-note-id} id
  ^{:validate efc/validate-note-text} text
  ^{:validate efc/validate-note-visibility} visibility] ; update note
  (if (not (nil? text))
    (response (s/update-note-text id text)))
  (if (not (nil? visibility))
    (response (s/update-note-visibility id visibility))))

(defn ^{:enforcer-ns 'mx.example.notes.web.enforcer} note$delete [
  ^{:validate efc/validate-note-id} id] ; delete note
  (if (s/delete-note id)
    (response {:success :ok :msg "farewell note"})
    (-> (response "uh oh, won't you help a brother out?")
        (status 500))))
