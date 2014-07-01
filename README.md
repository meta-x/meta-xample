# meta-xample

An example project showcasing the use of [paths](https://github.com/meta-x/paths), [enforcer](https://github.com/meta-x/enforcer) and [bodyguard](https://github.com/meta-x/bodyguard).

Also served as a learning tool for Clojurescript (and Om).

## Status

Functional, but frontend does not have a perfect UI/UX and lacks styling.

## Live Demo

http://clj-notes.herokuapp.com

## Usage

Before running, you'll need to set [environ](https://github.com/weavejester/environ)-compatible variables for `:mongo-uri` and `:cookiestore-key`.


`lein ring server` to run the backend.

`lein cljsbuild auto` to build the frontend clojurescript code.

## How things work

TODO

### Project Organization
; TODO: explain Amit's DDD

### Backend

### Frontend

#### Clojurescript

#### Om/core.async

## License

Copyright © 2014 Tony Tam

Released under the MIT license.
