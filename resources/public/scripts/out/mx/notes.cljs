(ns mx.notes
  (:require [dommy.core :refer [listen!]]
            [ajax.core :refer [GET POST PUT DELETE]]
            )
  (:use-macros [dommy.macros :only [node sel sel1]])
)

; [cljs-http.client :refer [delete get post put]]

(enable-console-print!)

(println "Hello world! I'm in notes.cljs")



(defn sign-out [evt]
  (let [user-id (.getItem js/localStorage :user-id)
        url (str "/user/" user-id)]
    (DELETE url {:handler #(println "yay")})
    )
  )
(listen! (sel1 :#sign-out) :click sign-out)

(defn change-privacy []

  )
(listen! (sel1 :#visibility) :click change-privacy)

(defn create-note []

  )
(listen! (sel1 :#create-note-btn) :click create-note)

(defn get-user-notes []

  )
(listen! (sel1 :#user-notes-btn) :click create-note)

(defn get-public-notes []

  )
(listen! (sel1 :#public-notes-btn) :click create-note)



