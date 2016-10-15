# ChangeGamer Platform

ChangeGamer Platform using the [parse-server](https://github.com/ParsePlatform/parse-server) as a submodule on Express.

Read the full Parse Server guide here: https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide

### Requirements

* Node 4.3.2 and later
* MongoDB Version 2.6.X or 3.0.X
* Python 2.X (For Windows users, 2.7.1 is the required version)

## Getting Started Locally

### Initial Setup

* Clone the ChangeGamer Platform to your local machine
* Make sure you have at least Node 4.3. `node --version`
* Install Node v4.3.2 (You can manage different versions of node using nvm. To Install nvm follow the instructions [here](https://github.com/creationix/nvm#installation))
* Install MongoDB (follow instructions [here](https://docs.mongodb.com/master/tutorial/install-mongodb-on-os-x/))

### Run Local Instance of Parse Platform
* Run MongoDB (type `mongod` in your terminal)
* Navigate to the root project directory (`motiv_parse_platform`)
* Run command `npm install` (this will install all the necessary dependencies)
* Run command `npm start` - this will spin up a local instance of parse server

### Testing Local Environment
* Test with web request by hitting endpoint (http://localhost:1337)
* Test with POST Request
```
curl -X POST \
  -H "X-Parse-Application-Id: YOUR_APP_ID" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  http://localhost:1337/parse/classes/GameScore
```

* Retrieve the object you just created with GET Request
```
curl -X GET \
  -H "X-Parse-Application-Id: YOUR_APP_ID" \
  -H "X-Parse-Master-Key: YOUR_APP_MASTER_KEY" \
  http://localhost:1337/parse/classes/GameScore
```

### Maintainers

Current Maintainers

* Kenan Pulak (kenanpulak) - kepulak@gmail.com
