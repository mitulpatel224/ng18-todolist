import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, input, model, Output } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { SwipeEvent } from '../../directives/swipe-core';
import { SwipeDirective } from '../../directives/swipe.directive';
import { Todo } from '../../models/model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgClass, HammerModule, SwipeDirective, CommonModule, DatePipe],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  /** Input Signal: to get and hold Todo item */
  todoData = input.required<Todo>();

  /** Model Signal: to allow view more detail from parent component */
  showMore = model<boolean>(false);

  /** Date format for task ETA */
  etaFormat: 'MMM dd' | 'MMM dd, YYYY' = 'MMM dd';

  /** Output: Event to perform action on task status change */
  @Output() markCheck = new EventEmitter<void>(true);

  /** Output: Event to perform action on task delete */
  @Output() delete = new EventEmitter<void>(true);

  /**
   * Toggle Description on action menu
   * @param flag Boolean
   */
  toggleDescription(flag: boolean) {
    this.etaFormat = flag ? 'MMM dd, YYYY' : 'MMM dd';
    this.showMore.update(() => flag);
  }

  onSwipeEnd({ direction, distance }: SwipeEvent) {
    if (direction == 'x') {
      if (distance < -60) this.delete.emit();
      if (distance > 60) this.markCheck.emit();
    }
  }
}
