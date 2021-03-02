import type {Identifier} from "./identifiable";

export interface Containing {
    resolve<T>(identifier: Identifier): T;
}
