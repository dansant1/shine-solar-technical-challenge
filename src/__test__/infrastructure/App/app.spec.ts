import express, { RequestHandler } from 'express';
import { App } from '../../../app';

describe('App', () => {
  let app: App;
  let mockMiddleware: RequestHandler;
  let mockController: { router: express.Router };

  beforeEach(() => {
    mockMiddleware = jest.fn();
    mockController = { router: express.Router() };
    app = new App({
      name: 'test-app',
      port: 3000,
      middlewares: [mockMiddleware],
      services: [mockController],
    });
  });

  test('should start listening to provided port', async () => {
    const listenSpy = jest.spyOn(app.app, 'listen').mockImplementationOnce(() => null);

    app.listen();

    expect(listenSpy).toHaveBeenCalledWith(3000, expect.any(Function));
  });

});
