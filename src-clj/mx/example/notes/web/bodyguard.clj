(ns mx.example.notes.web.bodyguard
  )

(def security-policy
  {
    :default-access :anon ; :auth|:anon - default protection for non-specified routes
    :routes { ; map with routes and required roles; {#"uri" :any} | {:roles #{:admin} :methods #{:post}}
      #"/note.*$" :any
      #"/admin.*$" #{:admin}
    }
    :on-authentication-fail (fn [request] {:status 401 :body "you must authenticate yourself in order to access this resource"})
    :on-authorization-fail (fn [request] {:status 403 :body "you're not allowed to access this resource"})
  })
