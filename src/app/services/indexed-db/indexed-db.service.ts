import { Injectable } from '@angular/core';
import { Todo } from '../../models/model';
import { IDBPDatabase, openDB } from 'idb';

const IDB_NAME = 'todo-signal-db';
const IDB_VERSION = 1;

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private iDB!: IDBPDatabase<Todo>;

  constructor() {
    this.createDBInstance();
  }

  public async getItem(id: string) {
    return (await this.iDB).get(IDB_NAME, id);
  }

  public async add(todo: Todo) {
    return (await this.iDB).add(IDB_NAME, todo);
  }

  public async update(todo: Todo) {
    return (await this.iDB).put(IDB_NAME, todo);
  }

  public async remove(id: string) {
    return (await this.iDB).delete(IDB_NAME, id);
  }

  public async getAll() {
    return (await this.iDB).getAll(IDB_NAME);
  }

  private async createDBInstance() {
    this.iDB = await openDB<Todo>(IDB_NAME, IDB_VERSION, {
      upgrade(database, oldVersion, newVersion, transaction, event) {
        const store = database.createObjectStore(IDB_NAME, {
          keyPath: 'id',
        });
        // store.index('order');
      },
    });
    this.iDB.addEventListener('error', (event) => {
      console.error('Unable to open Indexed_DB!');
    });
  }
}
