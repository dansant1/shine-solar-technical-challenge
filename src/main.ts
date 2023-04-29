import dotenv from 'dotenv';
import {
    App,
    Privilegy,
} from './app';
import {
    UserController,
    HealthController,
} from './app/controllers';
import express from 'express';

export const app = new App({
    name: 'base-service',
    port: Number(process.env.PORT) || 3000,
    services: [
        HealthController.create({
            domain: 'healthcheck',
            privilegy: Privilegy.INTERNAL,
            version: 'v1',
        }),
        UserController.create({
            domain: 'user',
            privilegy: Privilegy.PUBLIC,
            version: 'v1',
        }),
    ],
    middlewares: [express.json()],
})

app.listen();