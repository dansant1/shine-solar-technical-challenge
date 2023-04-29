import express from 'express';
import { Application } from 'express';
import {
    initApp,
    middlewares as Middlewares,
    controllers as Controllers
} from './interfaces';

export class App {
    public app: Application;
    public name: string;
    public readonly PORT: number;

    constructor(appInit: initApp) {
        this.app = express();
        this.name = appInit.name;
        this.PORT = appInit.port;
        this._setMiddlewares(appInit.middlewares);
        this._setServices(appInit.services);
    }

    static create(appInit: initApp): App {
        return new App(appInit);
    }

    private _setMiddlewares(middlewares: Middlewares): void {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }

    private _setServices(controllers: Controllers): void {
        const serviceName = this.name;
        controllers.forEach(controller => {
            controller.router.stack.forEach((element: any) => {
                element?.route.stack?.forEach((elementThis: any) => {
                    const method = elementThis.method.toUpperCase();
                    console.log(`${method} ${serviceName}/api${element.route.path}`);    
                });
            });
            this.app.use(`/${serviceName}/api`, controller.router);
        });
    }

    public listen(): void {
        this.app.listen(this.PORT, () => {
            console.log(`Running at port ${this.PORT}`);
        });
    }
}
