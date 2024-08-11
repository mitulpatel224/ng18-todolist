import {
  Component,
  EventEmitter,
  input,
  model,
  Output,
  output,
  signal,
} from '@angular/core';
import { Todo } from '../../models/model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  /** Input Signal: to get and hold Todo item */
  todoData = input.required<Todo>();

  /** Model Signal: to allow view more detail from parent component */
  showMore = model<boolean>(false);

  /** Output: Event to perform action on task status change */
  @Output() markCheck = new EventEmitter<void>(true);

  /** Output: Event to perform action on task delete */
  @Output() delete = new EventEmitter<void>(true);

  /**
   * Toggle Description on action menu
   * @param flag Boolean
   */
  toggleDescription(flag: boolean) {
    this.showMore.update(() => flag);
  }
}
