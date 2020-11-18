FROM node:11-alpine AS builder
COPY . ./angular-demo-app
WORKDIR /angular-demo-app
