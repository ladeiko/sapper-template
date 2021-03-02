import type { Startable } from "./startable";
import type { Dependent } from "./dependent";
import type { Identifiable } from "./identifiable";

export interface Service extends Identifiable, Startable, Dependent {}
