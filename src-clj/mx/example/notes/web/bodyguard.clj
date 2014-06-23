(ns mx.example.notes.web.bodyguard
  )

(def security-policy
  {
;     :default-access :anon ; :auth|:anon - default protection for non-specified routes
;     :routes { ; map with routes and required roles; {#"uri" :any} | {:roles #{:admin} :methods #{:post}}
;       #"/needs-authentication$" #{:user}
;       #"/needs-authorization$" #{:admin}
;       #"/something" {:roles #{:user} :methods #{:post}} ; only requires user role for POST methods
;     }
;     :on-authentication-fail (fn [request] {:status 401 :body "my custom 401 response"})
;     :on-authorization-fail (fn [request] {:status 403 :body "my custom 403 response"})
  })
