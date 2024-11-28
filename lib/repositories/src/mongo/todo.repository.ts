import type { BaseEntity, ITodoRepository, TodoEntity } from "@todo-app/lib-interfaces/index.js";
import type { Collection, Db, Document } from "mongodb";

export class MongoTodoRepository implements ITodoRepository {
    private collection: Collection<Document>;
    
    constructor(private db: Db) {
        this.collection = db.collection('items');
    }

    add = async (todo: TodoEntity): Promise<BaseEntity> => {
        const document = await this.collection.insertOne(todo);
        return { id: document.insertedId.toString() }
    }

    getAll = async (): Promise<TodoEntity[]> => {
        const items = await this.collection.find().toArray();
        return items.map(i => ({ id: i._id.toString(), item: i.item }));
    };
}