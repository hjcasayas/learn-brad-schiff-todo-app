import type { BaseEntity, TodoEntity } from "../entities/index.js";

export interface ITodoService {
    add: (todo: TodoEntity) => Promise<BaseEntity>;
    getAll: () => Promise<TodoEntity[]>;
    updateById: (todo: TodoEntity) => Promise<BaseEntity>;
    deletById: (id: string) => Promise<void>

}