authrouter
POST / signup
POST / login
POST / logout

profilerouter
GET / profile /view
PATCH / profile/edit
PATCH / porfile/password

connectionrequestRouter

POST/ request /send /interested/:userId
POST /request / send /ignored/:userId

POST/request/review/accepted/:requestId;
POST/request/review/rejected/:requestId;

userRouter
GET/users/connections
GET/user/request/received
GET/user/feed -gets you the profile

status ignored , interested , accepted , rejected
