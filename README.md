# meta-xample

An example project showcasing the use of [paths](https://github.com/meta-x/paths), [enforcer](https://github.com/meta-x/enforcer) and [bodyguard](https://github.com/meta-x/bodyguard).

This project also served as a learning case for Clojurescript (and Om). For a review of my Clojurescript/Om experience, check [this](http://islandofatlas.net/TODO).

Questions, suggestions or other comments should be directed to GitHub Issues.



## What exactly is this example?

This example is a basic CRUD app that allows users to write down notes. These notes are by default private, but they can be set to public so others can view them (when given a direct link).

The app allows anyone to create an account. Once that is done, notes can be created, viewed or deleted. The visibility of the note can also be changed.

### Live Demo

http://clj-notes.herokuapp.com

### Status

Functional, but frontend is not complete - does not have a perfect UI/UX (e.g. placeholder for error messages) and lacks styling. Some more features could be added. Check the GitHub issues list if you wish to implement something.



## Usage

Before running, you'll need to set [environ](https://github.com/weavejester/environ)-compatible variables for `:mongo-uri` and `:cookiestore-key`. This means creating a `.lein-env` with a map with the two keywords or setting the environment variables `MONGO_URI` and `COOKIESTORE_KEY`.

Run `lein cljsbuild auto` to build the frontend clojurescript code.

Run `lein ring server` to start the backend.



## How things work

TODO: image with system architecture



## Project Organization

The project is organized in the following way:

- Clojure code in `src-clj`

- Clojurescript code in `src-cljs`

[I understand that this is not the typical folder structure for Clojure/Script applications (typical folder structure is `src/clj` and `src/cljs`, even though someone - Chris Houser? - has suggested there should be no such separation by language but by domain).]



### Backend

The backend project's structure roughly follows Amit Rathore's [Domain-Driven Design with Clojure](http://www.infoq.com/presentations/DDD-Clojure). "Roughly", because I don't really use the Domain part (:o).

The app has one endpoint (`/`) that serves the html for a single page application and many endpoints fashioned in as a Web API.

The backend's modules are described next. You don't have to follow this kind of organization in your own project. It is simply broken down in many modules to better see how things interact.

#### main.clj
Route definition for the Ring app. The routes are defined using `paths` and the Ring app is setup to use these routes in the the ring middleware pipeline definition. The setup for `paths` is done by building the `routes-tree` and using `router-with-tree` as the handler for the Ring app.

The middleware pipeline also shows how `enforcer` and `bodyguard` are configured.

#### web/handlers.clj
The implementation of the endpoint handlers. It is your basic CRUD app.

Directly, the handlers deal with the required logic for their endpoint. In most cases, this means passing the arguments to the `service` layer and outputting the correct response e.g. HTTP status code 200 if sucessful and response in body, 404 if not found and error message in body, etc. Since all responses are automatically transformed into JSON by a middleware, no content-type changes are required (but could happen here, if needed).

Indirectly, data coercion and validation, using `enforcer`, is being done on the arguments of the handlers - notice the metadata in the handlers and the parameters.

#### web/enforcer.clj
This is the module with the functions that actually enforce the rules for the arguments of the handlers. Coercion operations are things such as converting the argument to a keyword. Validation is mainly "business logic" stuff, such as minimum password length, correct value checking and not empty value.

A authorization checker macro `when-auth-matches` was created to be used by some handlers that require that the client's identity is the same as of the owner of the resource that they are attempting to access. E.g. `notes$get` and `note$get` makes sure that the user can only access his own private notes and not someone else's private notes.

#### web/bodyguard.clj
This module simply defines the security policy for accessing the endpoints of the API.
The definition is quite simple:

- the default visibility is `:anon`, meaning that by default, any non-protected route is public.

- creating, editing and deleting notes can only be done by authenticated users in the `admin` or `user` role

- accessing admin operations can only be done by users with `admin` role

#### service.clj
The `service` module is the module responsible for the coordination of the system. In our basic example, `service` doesn't do much except calling the appropriate `storage` functions. In a more complex system, `service` could be doing business logic operations such as calling some parsers and/or communicating with queues or other processes.

#### storage.clj
Where things go to di... get stored! Communication with our database happens here (in this case, MongoDB).



### Frontend

The frontend app is a ClojureScript+Om+core.async Single Page Application (SPA). This means that all interaction with the server after the first request is done through AJAX calls to the server's Web API. After the data is retrieved and processed, it is rendered through Om components.

The folder organization for the frontend project is relatively simpler than the backend project as there are fewer modules. The code is broken into four modules: one module (`main`) starts the Om app and the frontend routing, another module (`server`) takes care of communicating with the server, and the remaining two modules are responsible for the "pages" and "views" Om components.

Do note that there is no "best architecture" for Om applications yet. Other than the React.js component's lifecycle, how components should interact with each other and with other entities is still something that the community is trying to reach a consensus.

If you'd like to read a bit more about the experience of developing a ClojureScript+Om app, check [this blog post]().

#### Om/core.async
TODO: what about describing the Om-related code???


There are several different types of communication happening in the application. Most of the communication happens using core.async's channels.

srv-ch
there's a channel for components to put requests for some operation to happen
this is a write-only channel for the components
the operations are server communication operations, but that is not important for the components
the type of operation is identified by a :tag
the response is given back to the component through a response channel
it is basically a "soft-dependency" (what's that?) between the components and the server, since it's the server module that exposes an interface to the components

app-ch
some events that happen in the components need to bubble back up to the root component
this channel allows for that to happen
root component listens to the channel to change the app's current state (current url)

event communication
x

component parent-child
in `notes-list`/`note-view`
sometimes child components must inform the parent component that something happened
in this case, the user triggered a click event that destroys the note
TODO: what? this makes no sense. the component should just put! to the srv-ch!



Do note that using Prismatic's [om-tools]() as such the code is a little bit less verbose


#### `main.cljs`
This module sets up the Om app and the frontend routing with [Secretary](https://github.com/.../secretary).

TODO: describe `app-state` atom - what does this structure mean
TODO: describe how the frontend routing works (secretary, set-current-view!, next-route)
TODO: describe how Om is used (root component), render-page, how "page transitions" occur (render-state)

#### `pages.cljs`
The "page" components.
TODO: describe index-view (image of the component)
TODO: describe sign-view (image of the component)
TODO: describe notes-view (image of the component)
TODO: describe note-view (image of the component) - will-mount (get-note and destroy-note) and the hack in render-state's build note-item (the filter); why this component exists at the "page level"


#### `views.cljs`
The "widget" components.

TODO: describe sign-buttons
TODO: describe sign-out-button - event handler puts a message in the srv-ch and when a successful response is received the app-state is updated and a new message is inserted into the app-ch to get a page transition
TODO: describe sign-in-up - dual purpose component depending on how it is instantiated; does input validation; event handler puts a message into srv-ch with respective tag and when successful response comes in, app-state is updated and a message is sent through app-ch to get a page transition
TODO: describe note-creator - component handles user input and when create event handler executes, sends the msg to srv-ch to create note
TODO: describe note-item - component that displays note information and allows for deleting/changing visibility of the note
TODO: describe notes-list - component that contains all the note-item sub components; will-mount get-notes and destroy note


#### `servers.cljs`
This is the module responsible for all server interaction
using cljs-http to interact with server via core.async
execution mode is to stay in a go-loop and wait for messages from components


## License

Copyright © 2014 Tony Tam

Released under the MIT license.
