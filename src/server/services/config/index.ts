import type { ConfigService } from "./config.service";
import { ConfigServiceImpl } from "./config.service.impl";
import type {Service} from "../../../shared/service";
import { CONFIG_SERVICE_IDENTIFIER } from "./config.service.id";

export type {
    ConfigService
}

export {
    CONFIG_SERVICE_IDENTIFIER
}

export function createConfigService(): ConfigService & Service {
    return new ConfigServiceImpl();
}
