(defproject meta-xample "0.1.0"
  :description "An example project using paths, enforcer and bodyguard."
  :url "https://github.com/meta-x/meta-xample"
  :license {
    :name "The MIT License"
    :url "http://opensource.org/licenses/MIT"
  }
  :dependencies [
    [org.clojure/clojure "1.6.0"]
    [ring/ring-core "1.3.0-RC1"]
    [ring/ring-jetty-adapter "1.3.0-RC1"]
    [paths "0.1.0-beta2"]
    [enforcer "0.1.0-beta1"]
    [bodyguard "0.2b"]
  ]
  :profiles {
    :dev {
      :plugins [
        [lein-ring "0.8.10"]
        [ring/ring-devel "1.2.2"]
      ]
    }
  }
  :ring {:handler paths-example.core/app}
)
