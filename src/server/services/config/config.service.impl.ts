import type { Service } from "../../../shared/service";
import type { ConfigService } from './config.service';
import type { Identifier } from "../../../shared/identifiable";
import {CONFIG_SERVICE_IDENTIFIER } from './config.service.id';
import type {Services} from "../../../shared/services";

export class ConfigServiceImpl implements ConfigService, Service {

    dependsOn(container: Services): Identifier[] {
        return [];
    }

    readonly id: Identifier = CONFIG_SERVICE_IDENTIFIER;
    async start() {}
    async stop() {}
}
