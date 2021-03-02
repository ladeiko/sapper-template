import sirv, {RequestHandler} from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import {createConfigService} from "./server/services/config";
import type {Services} from "./shared/services";
import type {AddressInfo} from "net";
import * as _ from 'lodash';
import {createServices} from "./shared/services.impl";
import { setServicesForRequest } from "./server/request.services";

const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';

function listen(services: Services): Promise<polka.Polka> {
    return new Promise<polka.Polka>((resolve, reject) => {
        console.log('Starting http server');
        const app = polka(); // You can also use Express

        const setupRequestHandler: RequestHandler = (req, res, next) => {
            setServicesForRequest(req, services);
            next!();
        };

        app
            .use(
                setupRequestHandler,
                compression({threshold: 0}),
                sirv('static', {dev}),
                sapper.middleware()
            )
            .listen(parseInt(PORT || '0', 10) || 0, (err) => {
                if (err) {
                    reject(err);
                } else {
                    const server = app.server!;
                    const address = <AddressInfo>server.address();
                    console.log('Listening on port ' + address.port);
                    resolve(app);
                    process.send && process.send('ready'); // PM2 support
                }
            });
    });
}

async function startServices(): Promise<Services> {
    const services = await createServices([
        createConfigService(),
    ]);

    console.log('Starting services');
    try {
        await services.start();
        console.log('Services started');
    } catch (e) {
        console.error(e);
        console.log('Emergency stopping already started services');
        try {
            await services.stop();
        } catch (e) {
            console.error(e);
        }
        throw e;
    }

    return services;
}

function setupShutdownHooks(app: polka.Polka, services: Services) {

    const stopEvents = [
        'SIGTERM',
        'SIGINT',
        'SIGQUIT'
    ];

    const stop = _.once((event: string) => {
        console.info(`${event} signal received`);
        console.log('Stopping');
        console.log('Closing http server');
        app.server!.close(async () => {
            console.log('Http server closed');
            console.log('Stopping services');
            await services.stop();
            console.log('Services stopped');
            process.exit(0);
        });
    });

    stopEvents.forEach((event) => {
        process.on(event, () => {
            stop(event);
        });
    });
}

async function main() {
    console.log('Starting');
    const services = await startServices();
    const app = await listen(services);
    setupShutdownHooks(app, services);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
