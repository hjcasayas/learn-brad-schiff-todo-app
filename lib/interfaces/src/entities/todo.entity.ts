import type { BaseEntity } from "./index.js";

export interface TodoEntity extends BaseEntity {
    item: string;
}