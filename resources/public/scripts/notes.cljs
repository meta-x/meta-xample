(ns mx.notes)

(comment

;  (:require [dommy.core :refer [listen! value set-value! text set-text! append! remove!]]
;             [dommy.attrs :refer [attr]]
;             [ajax.core :refer [GET POST PUT DELETE]])
;   (:use-macros [dommy.macros :only [node sel sel1]]))

; (enable-console-print!)

; (println "Hello world! I'm in notes.cljs")

; (defn- next-visibility
;   [vis-elem]
;   (case (text vis-elem)
;     "private" "public"
;     "public" "private"))

; (defn- toggle-visibility
;   [vis-elem]
;   (set-text! vis-elem (next-visibility vis-elem)))

; (defn sign-out
;   [evt]
;   (let [user-id (.getItem js/localStorage :user-id)
;         url (str "/user/" user-id)]
;     (DELETE url {:handler #(println "yay")})))
; (listen! (sel1 :#sign-out) :click sign-out)

; (defn change-new-note-visibility
;   []
;   (toggle-visibility (sel1 :#visibility-btn)))
; (listen! (sel1 :#visibility-btn) :click change-new-note-visibility)

; (defn- change-visibility
;   [target]
;   (let [elem (js->clj (.-currentTarget target))
;         parent (.-parentNode elem)
;         new-vis (next-visibility elem)]
;     (PUT (str "/note/" (attr parent :data-id)) {
;       :params {:visibility new-vis}
;       :handler #(set-text! elem new-vis)
;       :error-handler #(println %) ; TODO: set some error msg
;       :format :raw
;     })))

; (defn- delete-note
;   [target]
;   (let [elem (js->clj (.-currentTarget target))
;         parent (.-parentNode elem)]
;     (DELETE (str "/note/" (attr parent :data-id)) {
;       :params {}
;       :handler #(remove! parent) ; TODO: Uncaught TypeError: Cannot read property 'removeChild' of null
;       :error-handler #(println %) ; TODO: set some error msg
;       :format :raw
;     })))

; (defn- create-note-node
;   [note]
;   (let [id (get note "_id")
;         vis-elem (node [:button#note-visibility.text (get note "visibility")])
;         del-elem (node [:button#note-delete.text "delete"])
;         date-elem (node [:span.text (get note "date")])
;         text-elem (node [:div.text [:a.anchor {:href (str "/note/" id)} :text (get note "text")]])]
;     (listen! vis-elem :click change-visibility)
;     (listen! del-elem :click delete-note)
;     (node [:div {:data-id id} text-elem date-elem vis-elem del-elem])))

; (defn- on-note-create-success
;   [response]
;   (println "success")
;   (append! (sel1 :#notes) (create-note-node response))
;   (set-value! (sel1 :#note-text) ""))

; (defn- on-note-create-error
;   [response]
;   (println "error")
;   (println response)
;   ; set :#error-msg
;   )

; (defn create-note
;   []
;   (let [note-text (value (sel1 :#note-text))
;         note-visibility (text (sel1 :#visibility-btn))]
;     (POST "/note" {
;       :params {:text note-text :visibility note-visibility}
;       :format :raw
;       :handler on-note-create-success
;       :error-handler on-note-create-error
;     })))
; (listen! (sel1 :#create-note-btn) :click create-note)

; (defn- on-get-notes-success
;   [response]
;   (println "success")
;   (let [notes (sel1 :#notes)]
;     (doall (map
;       #(->> (create-note-node %)
;             (append! notes))
;       response))))

; (defn- on-get-notes-error
;   [response]
;   (println "error")
;   (println response))

; (defn get-user-notes
;   []
;   (GET "/note" {
;     :params {}
;     :format :raw
;     :handler on-get-notes-success
;     :error-handler on-get-notes-error
;   }))
; (listen! (sel1 :#user-notes-btn) :click get-user-notes)

; (defn get-public-notes
;   []
;   ; TODO: implement backend
;   )
; (listen! (sel1 :#public-notes-btn) :click get-public-notes)



; ; INIT
; (get-user-notes)

)