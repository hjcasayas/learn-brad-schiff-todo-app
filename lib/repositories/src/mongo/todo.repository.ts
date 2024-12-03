import type { BaseEntity, ITodoRepository, TodoEntity } from "@todo-app/lib-interfaces/index.js";
import { ObjectId, type Collection, type Db, type Document } from "mongodb";

export class MongoTodoRepository implements ITodoRepository {
    private collection: Collection<Document>;

    constructor(private db: Db) {
        this.collection = db.collection('items');
    }
    deletById = async (id: string): Promise<void> => {
        await this.collection.findOneAndDelete({ _id: new ObjectId(id) });
    };

    updateById = async (todo: TodoEntity): Promise<BaseEntity> => {
        const result = await this.collection.findOneAndUpdate({ _id: new ObjectId(todo.id) }, { $set: { item: todo.item } });
        if (result == null) {
            throw new Error('Something went wrong!');
        }
        return { id: result._id.toString() }
    };

    add = async (todo: TodoEntity): Promise<BaseEntity> => {
        const document = await this.collection.insertOne(todo);
        return { id: document.insertedId.toString() }
    }

    getAll = async (): Promise<TodoEntity[]> => {
        const items = await this.collection.find().toArray();
        return items.map(i => ({ id: i._id.toString(), item: i.item }));
    };
}