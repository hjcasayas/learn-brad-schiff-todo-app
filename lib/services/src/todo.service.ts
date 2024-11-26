import type { ITodoRepository, ITodoService, TodoEntity, } from "@todo-app/lib-interfaces/index.js";

export class TodoService implements ITodoService {

    constructor(private todoRepository: ITodoRepository) {

    }

    add = async (todo: TodoEntity) => {
        return await this.todoRepository.add(todo);
    }

}