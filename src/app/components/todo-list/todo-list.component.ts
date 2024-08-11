import { Component, computed, inject } from '@angular/core';
import { Todo } from '../../models/model';
import { TodoService } from '../../services/todo.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, TodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  /** Service: Todo service */
  private todoService = inject(TodoService);

  /** Signal Input: List of Todo items */
  protected todoList = computed(() =>
    this.todoService.todoList().filter((item) => !item.status),
  );
  protected doneList = computed(
    () => this.todoService.todoList().filter((item) => item.status) || [],
  );

  /** Signal: To calculate total completed items */
  protected totalDone = computed(() => this.doneList().length);

  /**
   * Change status of an item from the list
   * @param data Todo item
   */
  protected handleMarkCheck(data: Todo) {
    this.todoService.markAsDone(data, !data.status);
  }

  /**
   * Remove item from the list
   * @param data Todo item
   */
  protected handleDelete(data: Todo) {
    this.todoService.removeTodo(data);
  }

  /**
   * Adds new item to the list
   * @param data Todo
   */
  protected handleAddNew(data: Todo) {
    this.todoService.addNewTodo(data);
  }
}
