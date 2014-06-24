(defproject meta-xample "0.1.0"
  :min-lein-version "2.0.0"
  :description "An example project using paths, enforcer and bodyguard."
  :url "https://github.com/meta-x/meta-xample"
  :license {
    :name "The MIT License"
    :url "http://opensource.org/licenses/MIT"
  }
  :dependencies [
    ; CLOJURE
    [org.clojure/clojure "1.6.0"]
    [optimus "0.15.0"]

    [ring/ring-core "1.3.0"]
    [ring/ring-json "0.3.1"]
    [ring/ring-servlet "1.3.0"]
    [paths "0.1.0-beta4"]
    [enforcer "0.1.0-beta2"]
    [bodyguard "0.1.0-beta3"]

    [environ "0.5.0"] ; environment variables
    [clj-time "0.7.0"] ; date/time
    [com.novemberain/monger "2.0.0-rc1"] ; mongodb
    [com.novemberain/validateur "2.1.0"] ; validation

    ; CLOJURESCRIPT
    [org.clojure/clojurescript "0.0-2227"]
    [om "0.6.4"]
    [prismatic/om-tools "0.2.1"]
    [secretary "1.1.1"]
    [cljs-http "0.1.11"]
  ]
  :profiles {
    :dev {
      :plugins [
        [lein-ring "0.8.10"]
        [ring/ring-devel "1.2.2"]
        [lein-cljsbuild "1.0.3"]
      ]
    }
  }
  :source-paths ["src-clj/"]
  :ring {:handler mx.example.notes.main/app}

  :cljsbuild {
    :builds {
      :dev {
        :source-paths ["src-cljs/"]
        :compiler {
          :output-to "resources/public/scripts/mx.dev.js"
          :output-dir "resources/public/scripts/out-dev"
          :optimizations :none
          :source-map true
        }
      }
      :prod {
        :source-paths ["src-cljs/"]
        :compiler {
          :output-to "resources/public/scripts/mx.js"
          :optimizations :advanced
          :elide-asserts true
          :pretty-print false
          :output-wrapper false
          :preamble ["react/react.min.js"]
          :externs ["react/externs/react.js"]
        }
      }
    }
  })
