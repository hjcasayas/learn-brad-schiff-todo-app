import type { BaseEntity, TodoEntity } from "../entities/index.js";

export interface ITodoRepository {
    add: (todo: TodoEntity) => Promise<BaseEntity>
}