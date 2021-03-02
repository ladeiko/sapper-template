import type { Writable } from "svelte/store";
import type { UserState } from './userstate'

export type UserStateStore = Writable<UserState>;
