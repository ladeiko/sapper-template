import type { UserStateStore } from "./userstate.store";
import { writable } from "svelte/store";
import type { UserState } from "./userstate";
import {getContext, setContext} from "svelte";
import { defaultUserState } from "./default.userstate";

export type {
    UserState
}

export function createUserStateStore(): UserStateStore {
    return writable(defaultUserState);
}

const KEY = 'userState';

export function setUserStateStoreForContext(store: UserStateStore) {
    setContext(KEY, store);
}

export function getUserStateStoreFromContext(): UserStateStore {
    return <UserStateStore>getContext(KEY);
}
