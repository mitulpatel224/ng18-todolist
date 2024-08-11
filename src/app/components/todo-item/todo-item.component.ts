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
import { CommonModule, NgClass } from '@angular/common';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { SwipeDirective } from '../../directives/swipe.directive';
import { SwipeEvent } from '../../directives/swipe-core';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgClass, HammerModule, SwipeDirective, CommonModule],
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

  onSwipeEnd({ direction, distance }: SwipeEvent) {
    if (direction == 'x') {
      if (distance < -60) this.delete.emit();
      if (distance > 60) this.markCheck.emit();
    }
  }
}
