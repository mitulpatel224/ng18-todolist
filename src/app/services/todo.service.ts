import { inject, Injectable, signal } from '@angular/core';
import { Todo } from '../api/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  /** HTTP service */
  private http = inject(HttpClient);

  /** Signal: todoList to save and fetch data */
  todoList = signal<Todo[]>([
    {
      id: 1,
      task: 'Create JSON Server',
      description: 'This is a dummy todo description to setup the placeholders',
      eta: '2024-07-21T19:22:00:000Z',
      status: false,
    },
    {
      id: 2,
      task: 'Perform add, update, delete actions',
      description: `Allow user to Add new item,
      Allow user to update item with done state
      Allow user to delete item`,
      eta: '2024-08-04T22:00:000Z',
      status: false,
    },
  ]);

  constructor() {}

  /**
   * Add new item to todo list
   * @param data Todo
   */
  public addNewTodo(data: Todo) {
    const newItem = { ...data, id: this.todoList().length + 1 };
    this.todoList.update((list) => [newItem, ...list]);
    this.updateJSONServer(newItem);
  }

  /**
   * Mark an item done or pending
   * @param data Todo
   * @param flag boolean
   */
  public markAsDone(data: Todo, flag: boolean = true) {
    this.todoList.update((todos) =>
      todos.map((todo) =>
        todo.id === data.id ? { ...data, status: flag } : todo,
      ),
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
  protected async updateJSONServer(data: Todo) {
    this.http.post(`http://localhost:3000/todos`, data).subscribe();
  }
}
