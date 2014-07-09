# meta-xample

An example project showcasing the use of [paths](https://github.com/meta-x/paths), [enforcer](https://github.com/meta-x/enforcer) and [bodyguard](https://github.com/meta-x/bodyguard).

This project also served as a learning case for Clojurescript (and Om). <!--TODO: For a review of my Clojurescript/Om experience, check [this](http://islandofatlas.net/TODO).-->

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

Do note that there is no consensus for what is the "best architecture" for Om applications. How components should interact with each other and with other entities is still something that the community is still trying to find a consensus on.

<!--If you'd like to read a bit more about the experience of developing a ClojureScript+Om app, check [this blog post](http://islandofatlas.net/TODO).-->












#### Tying everything together
TODO: image of how things work




TODO: Routing
This being a SPA means that we must find a different way of telling the browser to completely render a new "page" and to make use of the back/forward history navigation.

This is accomplished through the use of [secretary](https://github.com/gf3/secretary), some manual URL change and a state machine in the root component.

So how does all this work?

First, we define a set of named Secretary routes. When a route is accessed, all that happens is an app-state transition (on `:current-view` and `:current-view-state`).
[code]

Then, in the root component, we "listen" on the `:current-view` state and run the `render-page` function that will `om/build` the respective page component.
[code]

But what happens if an URL transition is requested from within the application (e.g. a successful sign in should transition the user to the notes page)? Well, the root component is also listening on a core.async channel that is used for these notifications and determines if there is a page transition request. If that is the case, it will make use of the named routes to change the URL location `hash`. This in turn will trigger Secretary and change the app-state.

[figure with the routing flow]




TODO: Do note that the project is using Prismatic's [om-tools](). This might be confusing for beginners, since the code does not really match most Om tutorials out there but is a little bit less verbose.






#### Om Components
As described in the project structure, there are 2+1 types of components in this application.

- Root component: The component that controls the application. This component is used in `om/root` to initialize the application and works as a state machine, rendering the correct page component based on the app-state's `current-view` field.

- Page components: Components that are supposed to reflect a whole "page", i.e. routes will match page components.

- View components: "Widget" components that can be reusable in any "page" component.

I could've also turned the server module into an invisible component, but I don't really saw the need for that.










#### Communication with core.async
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









####

#### `main.cljs`
This module sets up the Om app and the frontend routing with Secretary.

The app-state is a simple map that holds the information regarding the current page view (`:current-view` and `:current-view-state`), if the user is authenticated (`:authenticated?`, `:username` and `:user-id`) and a vector with the notes (`:notes`) that the user is seeing in the current view (a list of notes or perhaps a vector with a single note).

; TODO: maybe talk about the root component?

The `render-page` function also takes into account if the page is "protected" and if the user is authenticated or not. Do note that this is a basic frontend protection which can easily be bypassed - it does not forfeit server side validation!

#### `pages.cljs`
This module contains the "page" components. Most of the page components are simple components that render the sub-components who do the actual work.

- `index-view`
The `index-view` is a simple view that shows a sign-in button and a sign-up button. Clicking on any of these buttons will transition the app to the `sign-view` page.
[figure]

- `sign-view`
The `sign-view` is a view that renders a sub-component with the username/password inputs and a button for the specific case (sign-in or sign-up).
[figure]

- `notes-view`
The `notes-view` contains two sub-components (`note-creator` and `notes-list`). It is the "main view" of the application once the user is signed-in.
[figure]

- `note-view`
The `note-view` is the page that displays info about a single note.

This component shows a "Loading" string while waiting for the data to be bound. Once the data is bound, a `note-item` sub-component is built. Since we're at the page level, we don't really have a cursor to the exact note. Thus a small hack is done to assert that we use the state of the exact note (not really required as the `:notes` vector in app-state actually only contains a single element).

The data for the note is fetched on `will-mount`. A message is put on the shared `srv-ch` and once the result comes in, the app-state is updated.

You'll notice that an `evt-ch` is passed to the sub-component. This channel is used to bubble up events to this page component from the sub-component. This is required so that this component can be notified of the `delete` event and do its required cleaning up.

[figure]




#### `views.cljs`
The "widget" components.

- `sign-buttons`
In this component, I decided to use an `a href` as a way to transition between pages, just to show that it can be done.
[figure]

- `sign-out-button`
The `sign-out-button` component is a simple button. When the button is clicked, the `on-sign-out-click` event handler puts a message in the `srv-ch`. When a successful response comes back, the app-state is updated so that the user is no longer authenticated and a message is put on the `app-ch` to request a page transition.
[figure]

- `sign-in-up`
This is a dual purpose component, depending on how it is built. It contains two input fields and a button. When the button is clicked, some validation is done on the input values and it will either sign-up a new user or sign-in an existing user.
Just as the other components, on success, the app-state is updated and a message is sent through `app-ch` to initiate a page transition.
There is also a hidden `div` that is used as an error message placeholder when an error occurs.
[figure]

- `note-creator`
This component builds a textarea and a few buttons to setup the UI for creating notes. When the create note button is clicked, a message is put into the `srv-ch` with the information about the new note. On success, the new note is added to the `app-state`'s `notes` vector.
[figure]

- `note-item`
This component displays note information and allows for deleting/changing visibility of the note. It is used both by the `note-view` page component and by the `notes-list` component. It functions just as the other components that deal with server communication.
[figure]

- `notes-list`
This component contains all the `note-item` sub components. The notes are fetched in `get-notes`. Notifications of note deletion are caught by `destroy-note`. All this is done on the components' `will-mount`.
[figure]

#### `servers.cljs`
This is the module responsible for all server interaction.
[cljs-http]() is used to communicate with the server asynchronously using core.async.
This module listens for orders from components in a go-loop on the `srv-ch`.
When a message is read, the requested operation is executed and the response is sent back to the component.
This is done through a response channel that was sent by the calling component.



## License

Copyright © 2014 Tony Tam

Released under the MIT license.
