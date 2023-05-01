# Shine Solar Technical Challenge

The technical challenge is about create a rate-limiter and data transformation service.

## Tech Stack

* Typescript
* NodeJS
* ExpressJS
* Jest
* Redis
* Docker

## Installation

Use the node package manager to install dependencies of the project.

```bash
npm install
```

## Run the project in local enviroment

be sure you have a NodeJS > v16.18 and
create a .env file in the root of the project, you can look an example in the file .env-example

```bash
REDIS_HOST=redis-host
PORT=3000
RATE_LIMITER_LINEAR_POINTS=10
RATE_LIMITER_LINEAR_DURATION=60
```

* RATE_LIMITER_LINEAR_POINTS is about the maximun times you can make the request in the configured duration, in this case 10 times per duration
* RATE_LIMITER_LINEAR_DURATION is in seconds, in this case you can set the duration to 60 seconds, equals to a 1 minute.

in the docker-compose.yml also you can set this enviroments

run the server with the npm command
```bash
npm start
```

## Run the project with Docker Compose

```bash
docker-compose up
```

## Make a request

```bash
curl --location --request POST 'http://localhost:3000/base-service/api/v1/public/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "daniel@gmail.com",
    "profile": {
        "name": "Daniel", 
        "other": null,
        "lastName": "Delgadillo"
    }
}'
```

## Run the Test

```bash
npm run test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[ISC](https://choosealicense.com/licenses/isc/)