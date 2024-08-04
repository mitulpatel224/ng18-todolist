import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Todo } from '../../api/model';

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
  taskContent = {
    task: '',
    eta: '',
  };

  @ViewChild('todoForm') todoForm!: NgForm;

  isSubmitted: boolean = false;

  submitForm() {
    const { eta = '' } = this.taskContent;
    const [task, ...description] = this.taskContent.task.split('\n');
    this.addNewItem.next({
      task,
      description: description.join(' ').trim(),
      eta,
      status: false,
      id: 0,
    });
    this.resetForm();
  }

  /** Reset form */
  resetForm() {
    this.todoForm.reset({ task: '', eta: '' });
  }
}
