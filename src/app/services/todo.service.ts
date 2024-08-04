import { inject, Injectable, signal } from '@angular/core';
import { Todo } from '../api/model';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  /** HTTP service */
  private http = inject(HttpClient);

  /** Signal: todoList to save and fetch data */
  todoList = signal<Todo[]>([]);

  constructor() {
    this.getListOfItems()
      .pipe(take(1))
      .subscribe(
        (res) => this.todoList.set([]),
        (err) => console.error(err),
      );
  }

  /**
   * Add new item to todo list
   * @param data Todo
   */
  public addNewTodo(data: Todo) {
    // const newItem = { ...data, id: String(Math.floor(Math.random() * 10000)) };
    const newItem = {
      ...data,
      id: Array.from(Array(20), () =>
        Math.floor(Math.random() * 36).toString(36),
      ).join(''),
    };
    this.todoList.update((list) => [newItem, ...list]);
    this.addNewItem(newItem);
  }

  /**
   * Mark an item done or pending
   * @param data Todo
   * @param flag boolean
   */
  public markAsDone(data: Todo, flag: boolean = true) {
    const newData = { ...data, status: flag };
    this.todoList.update((todos) =>
      todos.map((todo) => (todo.id === data.id ? newData : todo)),
    );
    this.updateItem(newData)
      .pipe(take(1))
      .subscribe(
        (_) => {},
        (err) => console.error(err),
      );
  }

  /**
   * Remove an item from Todo list
   * @param data Todo
   */
  public removeTodo(data: Todo) {
    this.todoList.update((todos) =>
      todos.filter((todo) => todo.id !== data.id),
    );
  }

  /**
   * Save Data to JSON server
   * @param data Todo
   */
  public async addNewItem(data: Todo) {
    return this.http.post(`http://localhost:3000/todos`, data).subscribe();
  }

  /**
   * Get list observable of todo-list
   * @returns Observable<Todo[]>
   */
  public getListOfItems() {
    return this.http.get<Todo[]>(`http://localhost:3000/todos`);
  }

  public updateItem(data: Todo) {
    const { status, task, description, eta } = data;
    return this.http.patch(`http://localhost:3000/todos/${data.id}`, {
      status,
      task,
      description,
      eta,
    });
  }
}
