import { Injectable, signal } from '@angular/core';
import { Todo } from '../api/model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  /** Signal: todoList to save and fetch data */
  todoList = signal<Todo[]>([
    {
      id: 1,
      task: 'Create JSON Server',
      description: 'This is a dummy todo description to setup the placeholders',
      eta: '2024-07-21T19:22:00:000Z',
      status: false,
    },
  ]);

  constructor() {}

  /**
   * Add new item to todo list
   * @param data Todo
   */
  public addNewTodo(data: Todo) {
    this.todoList.update((list) => [...list, { ...data, id: list.length }]);
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
}
