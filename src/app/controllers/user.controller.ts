import express, {
    Request,
    Response,
} from 'express';
import {
    IConfigController,
} from '../../infrastructure';
import { 
    manageError,
} from '../../global';
import {
    rateLimiterMiddleware,
    nullUndefinedRemovalMiddleware,
} from '../middlewares'

export class UserController {

    public router = express.Router();

    constructor(
        private config: IConfigController,
    ) {
        this.#initRoutes();
    }

    static create(config: IConfigController): UserController {
        return new UserController(config);
    }

    #getBasePath(endpoint?: string): string {
        return `/${this.config.version}/${this.config.privilegy}/${this.config.domain}/${endpoint ? endpoint : ''}`;
    }

    #initRoutes(): void {
        this.router.post(
            this.#getBasePath(), 
            [
                rateLimiterMiddleware,
                nullUndefinedRemovalMiddleware,
            ],
            this.#add,
        );
    }

    async #add(req: Request, res: Response): Promise<Response> {
        try {
            console.log('incoming payload =>', req.body);
            return res
                .status(200)
                .json({
                    message: 'success',
                });
        } catch (error) {
            return manageError(res, error);
        }
    }

}