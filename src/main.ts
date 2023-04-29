import dotenv from 'dotenv';
import {
    App,
    Privilegy,
} from './app';
import {
    UserController,
} from './app/controllers';
import express from 'express';

export const app = new App({
    name: 'base-service',
    port: Number(process.env.PORT) || 3000,
    services: [
        UserController.create({
            domain: 'user',
            privilegy: Privilegy.PUBLIC,
            version: 'v1',
        }),
    ],
    middlewares: [express.json()],
})

app.listen();