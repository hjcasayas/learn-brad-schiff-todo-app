import type { BaseEntity, ITodoRepository, ITodoService, TodoEntity, } from "@todo-app/lib-interfaces/index.js";

export class TodoService implements ITodoService {

    constructor(private todoRepository: ITodoRepository) {

    }
    deletById = async (id: string): Promise<void> => {
        await this.todoRepository.deletById(id);
    };

    updateById = async (todo: TodoEntity): Promise<BaseEntity> => {
        return this.todoRepository.updateById(todo);
    };

    add = async (todo: TodoEntity) => {
        return await this.todoRepository.add(todo);
    };

    getAll = async (): Promise<TodoEntity[]> => {
        return await this.todoRepository.getAll();
    };

}