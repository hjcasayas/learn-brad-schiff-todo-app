import type { BaseEntity, ITodoRepository, TodoEntity } from "@todo-app/lib-interfaces/index.js";
import type { Db, MongoClient } from "mongodb";

export class MongoTodoRepository implements ITodoRepository {
    constructor(private db: Db) { }
    add = async (todo: TodoEntity): Promise<BaseEntity> => {
        const document = await this.db.collection('items').insertOne(todo);
        return { id: document.insertedId.toString() }
    }
}