export type Identifier = string;

export class DuplicateIdentifierError extends Error {}

export interface Identifiable {
    readonly id: Identifier;
}
