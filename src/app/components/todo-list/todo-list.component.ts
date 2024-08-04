import { Component, computed, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo } from '../../api/model';
import { JsonPipe } from '@angular/common';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, TodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  /** Service: Todo service */
  todoService = inject(TodoService);

  /** Signal Input: List of Todo items */
  todoList = this.todoService.todoList;

  totalDone = computed(
    () => this.todoList().filter((todo) => todo.status === true)?.length,
  );

  /**
   * Change status of an item from the list
   * @param data Todo item
   */
  handleMarkCheck(data: Todo) {
    this.todoService.markAsDone(data, !data.status);
  }

  /**
   * Remove item from the list
   * @param data Todo item
   */
  handleDelete(data: Todo) {
    this.todoService.removeTodo(data);
  }

  handleAddNew(data: Todo) {
    this.todoService.addNewTodo(data);
  }
}
