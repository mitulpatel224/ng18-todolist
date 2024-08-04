import { Component, computed, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo } from '../../api/model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  /** Service: Todo service */
  todoService = inject(TodoService);

  /** Signal Input: List of Todo items */
  todoList = computed(() => this.todoService.todoList());

  totalPending = computed(
    () => this.todoList().map((todo) => todo.status === false)?.length,
  );

  handleMarkCheck(data: Todo) {
    this.todoService.markAsDone(data, !data.status);
  }
}
