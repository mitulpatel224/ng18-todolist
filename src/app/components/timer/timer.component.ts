import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
} from '@angular/core';
import { TimerService } from '../../services/timer/timer.service';
import { TimerModel } from '../../models/model';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  /** Event: To handle Click */
  @Output() click = new EventEmitter<void>();
  /** Instance: Timer service */
  timerService = inject(TimerService);

  /** Signal: To determine timer running state */
  running = this.timerService.running;

  /** Signal: Updated Time string */
  timeString = this.timerService.timerString;

  /**
   * Handle click event to emit further
   */
  onClick() {
    this.click.next();
  }
}
