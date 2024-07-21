import { Component, input, signal } from '@angular/core';
import { Todo } from '../../api/model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  /** Input Signal: to get and hold Todo item */
  todoData = input.required<Todo>();

  showMore = signal<boolean>(false);

  /**
   * Toggle Description on action menu
   * @param flag Boolean
   */
  toggleDescription(flag: boolean) {
    this.showMore.update(() => flag);
  }
}
