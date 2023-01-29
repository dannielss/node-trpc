import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { expressHandler } from 'trpc-playground/handlers/express';
import router from './router';

const trpcEndpoint = '/trpc';
const playgroundEndpoint = '/playground'

const runApp = async () => {
    const app = express();
    app.use(express.json());
    
    app.use(
        trpcEndpoint,
        trpcExpress.createExpressMiddleware({
            router
        })
    );

    app.use(
        playgroundEndpoint,
        await expressHandler({
            trpcApiEndpoint: trpcEndpoint,
            playgroundEndpoint,
            router
        })
    );
    
    app.listen(3000, () => console.log('Server is running'));
}

runApp();