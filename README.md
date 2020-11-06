# Applauz assessment

[![Build Status](https://travis-ci.org/JohnnyLin-a/applauz_assessment.svg?branch=main)](https://travis-ci.org/JohnnyLin-a/applauz_assessment)

Requirements:
- [x] Build an API service in Node. Its purpose would be to manage user accounts. \
        You can build your own or choose any frameworks available such as Express
- [ ] There is no database required but the data should be persistent. \
        I would suggest saving the data in-memory through JavaScript databases such as NEDB or using JSON documents.

- [ ] Endpoints:
    - [ ] Get a list of users with optional query parameters
    - [ ] Create a single or multiple users
    - [x] There should be validation
    - [x] There should be adequately structured responses and error handling
    - [x] All requests would need API Key authentication (can be hardcoded)
    - [ ] Some documentation in your repo to explain how to run this service \
                as well as how to use the endpoints would be appreciated
    - [x] Bonus: unit testing


Personal add-ons:
- [ ] Use PostgresDB for persistent storage
- [x] Add TravisCI implementation
- [x] Depoloy on [Heroku](https://applauz-express-assessment.herokuapp.com/)