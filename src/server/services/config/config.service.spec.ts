import { createConfigService, CONFIG_SERVICE_IDENTIFIER } from "./index";
import { ConfigServiceImpl } from "./config.service.impl";

describe('config.service.impl', () => {

    test('should work', async () => {
        const service = createConfigService();
        expect(service).toBeInstanceOf(ConfigServiceImpl);
        expect(service.id).toStrictEqual(CONFIG_SERVICE_IDENTIFIER);
        await expect(service.start()).resolves.toEqual(undefined);
        await expect(service.stop()).resolves.toEqual(undefined);
    });

});
