import { inject, Injectable, signal } from '@angular/core';
import { Todo } from '../models/model';
import { IndexedDbService } from './indexed-db/indexed-db.service';

// Generate a unique id for db entry
const generateUniqueId = () =>
  Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join(
    '',
  );

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  /** IndexedDB service */
  private iDBService = inject(IndexedDbService);

  /** Signal: todoList to save and fetch data */
  todoList = signal<Todo[]>([]);

  constructor() {
    // TODO: find alternative of setTimeout
    setTimeout(async () => {
      this.fetchAllData();
    }, 100);
  }

  public fetchAllData() {
    this.iDBService
      .getAll()
      .then((res) => {
        // Sort by order: Ascending
        const orderedList = res.sort((a: Todo, b: Todo) => a.order - b.order);
        return this.todoList.set(orderedList || []);
      })
      .catch((err) => console.error(err));
  }

  /**
   * Add new item to todo list
   * @param data Todo
   */
  public addNewTodo(data: Todo) {
    const id = generateUniqueId();
    const newItem: Todo = { ...data, id, order: this.todoList().length + 1 };
    this.iDBService.add(newItem);
    this.fetchAllData();
  }

  /**
   * Mark an item done or pending
   * @param data Todo
   * @param flag boolean
   */
  public markAsDone(data: Todo, flag: boolean = true) {
    const newData = { ...data, status: flag };
    this.iDBService.update(newData);
    this.fetchAllData();
  }

  /**
   * Remove an item from Todo list
   * @param data Todo
   */
  public removeTodo(data: Todo) {
    this.iDBService.remove(data.id);
    this.fetchAllData();
  }
}
