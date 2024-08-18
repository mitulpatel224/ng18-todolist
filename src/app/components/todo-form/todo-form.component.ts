import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Todo } from '../../models/model';
import { TrimDirective } from '../../directives/trim/trim.directive';


/**
 * Validation: Min Date
 * @param minDate Date
 * @returns ValidationErrors | null
 */
const minDateValidator = (minDate: Date) => {
  return (control: AbstractControl): ValidationErrors | null => {
    const min = new Date(minDate);
    min.setHours(0);
    min.setMinutes(0);
    min.setSeconds(0);
    min.setMilliseconds(0);

    return new Date(control.value).getTime() < min.getTime()
      ? { minDate: 'Invalid date' }
      : null;
  };
};

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule,TrimDirective],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  /** Output: Event for adding new item */
  @Output() addNewItem = new EventEmitter<Todo>(true);

  /** Const: Min date value for date picker control */
  readonly minDate = new Date();

  /** Instance: taskContent */
  isSubmitted = false;

  /** Element: Form instance */
  todoForm = new FormGroup({
    task: new FormControl('', [Validators.required]),
    eta: new FormControl('', [minDateValidator(this.minDate)]),
  });

  ctrl(name: string) {
    return this.todoForm.get(name) as AbstractControl;
  }

  /**
   * Callback: for Form submit event from template
   */
  submitForm() {
    this.isSubmitted = true;
    if (this.todoForm.invalid) return;

    const { task: textArea = '', eta } = this.todoForm.getRawValue();
    const [task, ...description] = (textArea as string).trim().split('\n');
    this.addNewItem.next({
      task,
      description: description.join(' ').trim(),
      eta: eta as string,
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
    this.todoForm.reset({ task: '', eta: '' });
  }
}
