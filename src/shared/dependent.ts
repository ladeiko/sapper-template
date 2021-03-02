import type { Identifier } from "./identifiable";
import type { Containing } from "./containing";

export interface Dependent {
    dependsOn<T>(container: Containing): Identifier[];
}
