import type {Config} from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        preset: 'ts-jest',
        testEnvironment: 'node',
        bail: false,
        silent: true,
        verbose: true,
        testPathIgnorePatterns: [
            "node_modules"
        ],
        transformIgnorePatterns: [
            "!node_modules/sveltestrap"
        ],
        transform: {
            "^.+\\.js$": "babel-jest",
            "^.+\\.mjs$": "babel-jest",
            "^.+\\.svelte$": [
                "svelte-jester", {
                    "preprocess": true
                }
            ],
            "^.+\\.ts$": "ts-jest"
        },
        moduleFileExtensions: [
            "ts",
            "js",
            "mjs",
            "svelte"
        ],
        setupFilesAfterEnv: [
            "<rootDir>/jest-setup.ts"
            // "@testing-library/jest-dom/extend-expect"
        ]
    };
};
