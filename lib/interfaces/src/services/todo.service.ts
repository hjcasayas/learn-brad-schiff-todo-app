import type { BaseEntity, TodoEntity } from "../entities/index.js";

export interface ITodoService {
    add: (todo: TodoEntity) => Promise<BaseEntity>
}