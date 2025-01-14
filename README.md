# News Application 

### Overview

A simple news aggregator app made in React Js.

### Project Structure
```
news-aggregator/
│
├── public/
├── src/
│   ├── components/
│   ├── config/
│   ├── images/
│   ├── pages/
│   ├── router/
│   ├── store/
│   └── ...
├── .dockerignore
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── ...
```

## Dockerization

## Build and Run the Docker Container
1. Build the Docker Image: Open a terminal in the root directory of your project and run:

	`docker build -t news-app .`

2. Run the Docker Container: To start a container from your image, run:
	`docker run -p 3000:3000 news-app`
