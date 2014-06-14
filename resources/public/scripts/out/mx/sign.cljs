(ns mx.sign
  (:require [dommy.core :refer [listen! value set-text!]]
            [ajax.core :refer [GET POST]])
  (:use-macros [dommy.macros :only [sel1]]))

(enable-console-print!)

(println "Hello world!, I'm in sign.cljs")



(defn- on-sign-success
  [response]
  (let [user-id (get response "_id")]
    (.setItem js/localStorage :user-id user-id)
    ; TODO: render new view
    (println "yay!")))

(defn- on-sign-error
  [response]
  (->
    :#error-msg
    (sel1)
    (set-text! (:response response))))

(defn- get-user-pwd!
  []
  [(value (sel1 :#username-input)), (value (sel1 :#password-input))])

(defn- cancel-submit
  [evt]
  (.preventDefault evt)
  (.stopPropagation evt))

(defn- sign
  [method params evt]
  (method "/user" {
    :params params
    :format :raw
    :handler on-sign-success
    :error-handler on-sign-error
  })
  (cancel-submit evt))

(defn sign-in
  [evt]
  (let [[username password] (get-user-pwd!)]
    (sign GET {:username username :password password} evt)))
(listen! (sel1 :#sign-in) :click sign-in)

(defn sign-up
  [evt]
  (let [[username password] (get-user-pwd!)]
    (sign POST {:username username :password password :roles ["user"]} evt)))
(listen! (sel1 :#sign-up) :click sign-up)
