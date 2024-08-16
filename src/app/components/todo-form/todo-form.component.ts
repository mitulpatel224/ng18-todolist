import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { Todo } from '../../models/model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  /** Output: Event for adding new item */
  @Output() addNewItem = new EventEmitter<Todo>(true);

  /** Const: Min date value for date picker control */
  readonly minDate = new Date().toISOString().split('T')[0];

  /** Instance: taskContent */
  taskContent = { task: '', eta: '' };
  isSubmitted = false;

  /** Element: Form instance */
  @ViewChild('todoForm') todoForm!: NgForm;

  /** Element: Form Control instance */
  @ViewChild('task') taskCtrl!: FormControl;

  /**
   * Callback: for Form submit event from template
   */
  submitForm() {
    this.isSubmitted = true;
    if (this.todoForm.invalid) return;
    
    // TODO: stop propagation of form submit
    const [task, ...description] = this.taskContent.task.split('\n');
    this.addNewItem.next({
      task,
      description: description.join(' ').trim(),
      eta: this.taskContent.eta || '',
      status: false,
      id: '0',
      order: 0,
    });
    // Reset form instance
    this.resetForm();
  }

  /**
   * Reset form
   */
  resetForm() {
    this.isSubmitted = false;
    this.taskCtrl.reset('');
    this.todoForm.reset({ task: '', eta: '' });
  }
}
