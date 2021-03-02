import toposort from 'toposort';
import type {Services} from "./services";
import type {Service} from "./service";
import type {Identifier} from "./identifiable";
import {DuplicateIdentifierError} from "./identifiable";
import type {Startable} from "./startable";
import type {Containing} from "./containing";

class ServicesImpl implements Services, Startable, Containing {

    private readonly started: Service[] = [];
    private readonly services: { [id: string]: Service };

    constructor(services: Service[]) {
        this.services = services.reduce((result, service) => {
            if (result[service.id]) {
                throw new DuplicateIdentifierError(service.id);
            }
            result[service.id] = service;
            return result;
        }, {});
    }

    async start() {
        const graph = Object.values(this.services).map((service) => [service.id, ...service.dependsOn(this)]);
        for (const id of toposort(graph).reverse().filter((id) => !!id)) {
            const service = this.services[id]!;
            console.log(`Starting ${service.id}`);
            await service.start();
            this.started.push(service);
        }
    }

    async stop() {
        while (this.started.length > 0) {
            const service = this.started.pop()!;
            try {
                console.log(`Stopping ${service.id}`);
                await service.stop();
            }
            catch (e) {
                console.error(e);
            }
        }
    }

    resolve<T>(identifier: Identifier): T {
        return <T><unknown>this.services[identifier];
    }
}

export function createServices(services: Service[]): Services {
    return new ServicesImpl(services);
}
