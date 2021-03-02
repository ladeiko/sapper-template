import type { Service } from "./service";
import type { Identifier } from "./identifiable";
import {DuplicateIdentifierError} from "./identifiable";
import {createServices} from "./services.impl";

function sleep(ms: number) {
    return new Promise<void>((resolve => setTimeout(resolve, ms)));
}

class Service1 implements Service {
    static id: Identifier = "1";
    started?: Date
    stopped?: Date
    async start() {
        if (this.started) {
            throw new Error('called');
        }
        this.started = new Date();
        await sleep(2);
    }
    async stop() {
        if (this.stopped) {
            throw new Error('called');
        }
        this.stopped = new Date();
        await sleep(2);
    }
    readonly id: Identifier = Service1.id;
    dependsOn(): Identifier[] {
        return [];
    }
}

class Service2 implements Service {
    static id: Identifier = "2";
    started?: Date
    stopped?: Date
    async start() {
        if (this.started) {
            throw new Error('called');
        }
        this.started = new Date();
        await sleep(2);
    }
    async stop() {
        if (this.stopped) {
            throw new Error('called');
        }
        this.stopped = new Date();
        await sleep(2);
    }
    readonly id: Identifier = Service2.id;
    dependsOn(): Identifier[] {
        return [Service1.id];
    }
}

describe('services.impl', () => {

    test('should not register services with the same identifier', async () => {
        expect(() => {
            createServices([
                new Service1(),
                new Service1(),
            ])
        }).toThrowError(new DuplicateIdentifierError(Service1.id));
    });

    test('should resolve', async () => {
        const services = createServices([
            new Service1(),
            new Service2(),
        ]);
        expect(services.resolve(Service1.id)).toBeInstanceOf(Service1);
        expect(services.resolve(Service2.id)).toBeInstanceOf(Service2);
    });

    test('should start and stop in proper order', async () => {
        const services = createServices([
            new Service2(),
            new Service1(),
        ]);

        await expect(services.start()).resolves.toEqual(undefined);

        const service1: Service1 = services.resolve(Service1.id);
        const service2: Service2 = services.resolve(Service2.id);

        expect(service1.started).toBeInstanceOf(Date);
        expect(service2.started).toBeInstanceOf(Date);

        expect(service1.stopped).toBeUndefined();
        expect(service2.stopped).toBeUndefined();

        expect(service2.started!.getTime()).toBeGreaterThan(service1.started!.getTime());

        await expect(services.stop()).resolves.toEqual(undefined);

        expect(service1.stopped).toBeInstanceOf(Date);
        expect(service2.stopped).toBeInstanceOf(Date);

        expect(service1.stopped!.getTime()).toBeGreaterThan(service2.stopped!.getTime());
    });

});
