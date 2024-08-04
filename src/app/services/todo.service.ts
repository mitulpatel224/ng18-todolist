import { inject, Injectable, signal } from '@angular/core';
import { Todo } from '../api/model';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { environment } from '../../environments/environment';

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
        (res) => this.todoList.set(res || []),
        (err) => console.error(err),
      );
  }

  /**
   * Add new item to todo list
   * @param data Todo
   */
  public addNewTodo(data: Todo) {
    const newItem = {
      ...data,
      id: Array.from(Array(20), () =>
        Math.floor(Math.random() * 36).toString(36),
      ).join(''),
    };
    // TODO: remove manual update
    this.todoList.update((list) => [newItem, ...list]);

    this.addNewItem(newItem)
      .pipe(take(1))
      .subscribe(
        (_) => {
          this.todoList.update((list) => [newItem, ...list]);
        },
        (err) => console.error(err),
      );
  }

  /**
   * Mark an item done or pending
   * @param data Todo
   * @param flag boolean
   */
  public markAsDone(data: Todo, flag: boolean = true) {
    const newData = { ...data, status: flag };

    // TODO: remove manual update
    this.todoList.update((todos) =>
      todos.map((todo) => (todo.id === data.id ? newData : todo)),
    );

    this.updateItem(newData)
      .pipe(take(1))
      .subscribe(
        (_) => {
          this.todoList.update((todos) =>
            todos.map((todo) => (todo.id === data.id ? newData : todo)),
          );
        },
        (err) => console.error(err),
      );
  }

  /**
   * Remove an item from Todo list
   * @param data Todo
   */
  public removeTodo(data: Todo) {
    // TODO: remove manual update
    this.todoList.update((todos) =>
      todos.filter((todo) => todo.id !== data.id),
    );

    this.deleteItem(data.id)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.todoList.update((todos) =>
            todos.filter((todo) => todo.id !== data.id),
          );
        },
        (err) => console.error(err),
      );
  }

  /**
   * Save Data to JSON server
   * @param data Todo
   */
  public addNewItem(data: Todo) {
    return this.http.post(`${environment.API}/todos`, data);
  }

  /**
   * Get list observable of todo-list
   * @returns Observable<Todo[]>
   */
  public getListOfItems() {
    return this.http.get<Todo[]>(`${environment.API}/todos`);
  }

  /**
   * Update the item detail for given id
   * @param data Todo
   * @returns Observable<Todo>
   */
  public updateItem(data: Todo) {
    const { status, task, description, eta } = data;
    return this.http.patch(`${environment.API}/todos/${data.id}`, {
      status,
      task,
      description,
      eta,
    });
  }

  /**
   * Deletes item for the given id
   * @param id string
   * @returns Observable<boolean>
   */
  public deleteItem(id: string) {
    return this.http.delete(`http://localhost:3000/todos/${id}`);
  }
}
