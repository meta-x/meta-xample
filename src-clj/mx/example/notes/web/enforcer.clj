(ns mx.example.notes.web.enforcer
  (:require [clojure.string :refer [blank? trim]]
            [clojure.set :refer [difference]]
            [ring.util.response :refer [response status]]))

; TODO: validate-fail
; TODO: :coerce-fail

; COERCION

(defn coerce-roles [param arg]
  (->>
    arg
    (map keyword)
    (set)))

(defn coerce-visibility [param arg]
  (keyword arg))

; VALIDATION

(defn- throw-exception [s]
  (throw (Exception. s)))

(defn- not-blank-ex [param arg]
  (if (blank? arg)
    (throw-exception (str param " is required and cannot be empty"))))

(defn- not-empty-ex [param arg]
  (if (empty? arg)
    (throw throw-exception (str param " is required"))))

(def MIN_PASSWORD_LENGTH 8)
(defn- strong-password-ex [param arg]
  (if (< (count arg) MIN_PASSWORD_LENGTH)
    (throw-exception (str param " must have at least " MIN_PASSWORD_LENGTH " characters"))))

(defn- invalid-roles-ex [param arg]
  (let [roles-diff (difference #{:admin :user} arg)]
    (if-not (empty? roles-diff)
      (throw-exception (str param " cannot accept unknown values " roles-diff)))))

(defn- invalid-visibility-ex [param arg]
  (if (nil? (#{:public :private} arg))
    (throw-exception (str param " cannot takes unknown value " arg))))

(defn- whitespaces-ex [param arg]
  (if-not (= arg (trim arg))
    (throw-exception (str param " cannot start or end with whitespaces"))))


(defn validate-username [param arg]
  (not-blank-ex param arg)
  (whitespaces-ex param arg)
  arg)

(defn validate-password [param arg]
  (not-blank-ex param arg)
  (strong-password-ex param arg)
  arg)

(defn validate-roles [param arg]
  (not-empty-ex param arg)
  (invalid-roles-ex param arg)
  arg)

(defn validate-user-id [param arg]
  (not-blank-ex param arg)
  ; if you want to be picky: check for mongodb uuid format
  arg)

(defn validate-note-id [param arg]
  (not-blank-ex param arg)
  ; if you want to be picky: check for mongodb uuid format
  arg)

(defn validate-note-visibility [param arg]
  ;(not-blank-ex param arg)
  (invalid-visibility-ex param arg)
  arg)

(defn validate-note-text [param arg]
  (not-blank-ex param arg)
  arg)



(defn invalid-auth? [user-id auth]
  (if-not (= (:user-id auth) user-id)
    (-> (response "who are you and what are you trying to do?")
        (status 403))))

(defmacro when-auth-matches [user-id auth-obj & body]
  `(if-let [invalid-auth# (invalid-auth? ~user-id ~auth-obj)]
    invalid-auth#
    (do ~@body)))
