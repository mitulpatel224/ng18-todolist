import { Component, computed, inject } from '@angular/core';
import { Todo } from '../../models/model';
import { TodoService } from '../../services/todo.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TimerComponent } from '../timer/timer.component';
import { FocusModeComponent } from '../focus-mode/focus-mode.component';
import { TimerService } from '../../services/timer/timer.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoItemComponent,
    TodoFormComponent,
    TimerComponent,
    FocusModeComponent,
  ],
  providers: [TimerService],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  /** Service: Todo service */
  private todoService = inject(TodoService);

  /**
   * Flag: to enable/disable focus mode
   * It toggles the Focus Mode component when true
   */
  focusMode: boolean = false;

  /** Signal: List of Todo items */
  protected todoList = computed(() =>
    this.todoService.todoList().filter((item) => !item.status),
  );
  /** Signal: List of Done items */
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

  /**
   * Toggle Focus mode to enable/disable Focus component
   */
  toggleTimerMode() {
    // focus mode
    this.focusMode = !this.focusMode;
  }
}
