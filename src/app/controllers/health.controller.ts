import express, {
    Request, 
    Response,
} from 'express';
import {
    IConfigController,
} from '../../infrastructure';

export class HealthController {
  
    public router = express.Router();

    constructor(
        private config: IConfigController,
    ) {
        this.#initRoutes();
    }

    static create(config: IConfigController): HealthController {
        return new HealthController(config);
    }

    #getBasePath(endpoint?: string): string {
        return `/${this.config.version}/${this.config.privilegy}/${this.config.domain}/${endpoint ? endpoint : ''}`;
    }

    #initRoutes(): void {
        this.router.get(this.#getBasePath(), this.#get);
    }

    async #get(req: Request, res: Response): Promise<Response> {
        return res
        .status(200)
        .json({
            message: 'healthcheck success',
        });
    }
}