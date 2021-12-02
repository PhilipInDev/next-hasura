# Docker

## Build

To build your docker images, run the command

    docker-compose build

## Start

At the root level run the command

    docker-compose up

Then go to the [localhost:3000](localhost:3000) website.


Then go to the [localhost:8080](localhost:8080) hasura console.

## Stop all running containers

    docker stop $(docker ps -aq)

## Remove all containers

    docker rm $(docker ps -aq)

## Clean all untagged images and unused containers

    docker system prune
