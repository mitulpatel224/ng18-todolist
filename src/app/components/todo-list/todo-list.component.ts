import { Component, computed, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

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
  todoList = this.todoService.todoList;
  
  totalPending = computed(
    () => this.todoList().map((todo) => todo.status === false)?.length,
  );
}
