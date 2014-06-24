(ns mx.example.notes.web.enforcer
  (:require [clojure.string :refer [blank?]]
  ))

; USE VALIDATEUR



; TODO: xxx
; :validate-fail
; :coerce-fail

(defn validate-username [param arg]
  ; not blank
  ; what else to validate?
  arg
  )

(defn validate-password [param arg]
  ; not blank
  ; strongness (# chars, etc)
  arg
  )

(defn validate-roles [param arg]
  ; not nil
  ; :user or :admin
  arg
  )

(defn validate-user-id [param arg]
  ; not blank
  ; has mongodb uuid format
  arg
  )

(defn validate-note-visibility [param arg]
  ; not blank
  ; :public / :private
  arg
  )

(defn validate-note-id [param arg]
  ; not blank
  ; has mongodb uuid format
  arg
  )

(defn validate-note-text [param arg]
  ; not blank
  arg
  )




