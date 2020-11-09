# Applauz assessment

[![Build Status](https://travis-ci.org/JohnnyLin-a/applauz_assessment.svg?branch=main)](https://travis-ci.org/JohnnyLin-a/applauz_assessment)

This is my assessment submission for Applauz.\
Alternatively to running this project locally, I have hosted this project on [Heroku](https://applauz-express-assessment.herokuapp.com/).

### Instructions to run project:
| Software Prerequisites | Version |
| ------------- | ------------- |
| [Docker](https://docs.docker.com/get-docker/) | latest as of Nov-2020 |
| [Docker-compose](https://docs.docker.com/compose/install/) (if using Linux only) | latest as of Nov-2020 |
| [Postman](https://www.postman.com/downloads/) | latest as of Nov-2020 |


#### Project setup
1. Make sure port 5432, 3000 are not being used.
2. Clone this repo
3. Navigate to the root of this project from a terminal
4. Execute these commands (These are for linux, but other OS should be fairly similar):
```
# Copy and rename example env files for proper ones. They are pre-configured.
cp .env.example .env
cp web-client/.env.example web-client/.env
cp postgres.env.example postgres.env

# Setup Docker environment (may require sudo)
docker-compose up -d

# SSH into database container (may require sudo)
docker exec -it applauz_db sh

# Setup database
psql -d $POSTGRES_DB -U $POSTGRES_USER < ./applauz_database/create.sql
exit
```
5. ~~Use Postman to use this app from http://localhost:3000/ or from [Heroku](https://applauz-express-assessment.herokuapp.com/)~~

6. NEW UPDATE! There is now a web client to test the endpoints.\
        Simply head over to http://localhost:3000/ or to the [Heroku link](https://applauz-express-assessment.herokuapp.com/).\
        The web client is very similar to Postman.

### Using this app (with Postman)
1. Enter the request URL including endpoint (http://localhost:3000/api/users/ or the [Heroku](https://applauz-express-assessment.herokuapp.com/) one)
2. In the Authorization tab, select the "API Key" type and fill these in:

| Key     | (Default) value            | Add to |
| ------- | -------------------------- | ------ |
| api_key | APPLAUZ_ASSESSMENT_API_KEY | Header |

3. To add a request body, go to the "Body" tab, select the "raw" radio button and select "JSON" from the drop-down on the far right from the radio buttons.
4. To add request parameters, go to the "Params" tab, enter the key and value (1 parameter per row).
5. After configuring the request, click on "Send" to make the request itself. The response should show up right below in the "Response" pane.

### API Requests
| Endpoint        | Method | Description        | Param/Body              |
| --------------- | ------ | ------------------ | ----------------------- |
| /api/users/     | GET    | Get all users      | None                    |
| /api/users/     | GET    | Get a user by name | Param: ?name=string     |
| /api/users/{id} | GET    | Get a user by ID   | None                    |
| /api/users/     | POST   | Create a new user  | Body: { name: string }  |
| /api/users/     | DELETE | Delete a user      | Body: { id: number }    |

### Project Requirements:
- [x] Build an API service in Node. Its purpose would be to manage user accounts. \
        You can build your own or choose any frameworks available such as Express
- [x] There is no database required but the data should be persistent. \
        I would suggest saving the data in-memory through JavaScript databases such as NEDB or using JSON documents.

- [x] Endpoints:
    - [x] Get a list of users with optional query parameters
    - [x] Create a single or multiple users
    - [x] There should be validation
    - [x] There should be adequately structured responses and error handling
    - [x] All requests would need API Key authentication (can be hardcoded)
    - [x] Some documentation in your repo to explain how to run this service \
                as well as how to use the endpoints would be appreciated
    - [x] Bonus: unit testing (Check the [Travis](https://travis-ci.org/JohnnyLin-a/applauz_assessment) logs for tests results.)


#### Personal add-ons:
- [x] Dockerize this app
- [x] Use PostgresDB for persistent storage
- [x] Add [TravisCI](https://travis-ci.org/JohnnyLin-a/applauz_assessment) implementation
- [x] Deploy on [Heroku](https://applauz-express-assessment.herokuapp.com/)