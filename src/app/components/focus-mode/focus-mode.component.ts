import {
  Component,
  computed,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { TimerService } from '../../services/timer/timer.service';

@Component({
  selector: 'app-focus-mode',
  standalone: true,
  imports: [],

  templateUrl: './focus-mode.component.html',
  styleUrl: './focus-mode.component.scss',
})
export class FocusModeComponent {
  /** Event: to emit close */
  @Output() close = new EventEmitter<void>();
  /** Instance: Timer Service */
  timerService = inject(TimerService);
  /** Signal: To determine timer running state */
  running = this.timerService.running;

  /** Signal: Updated Time string */
  timeString = this.timerService.timerString;

  /**
   * Resets the default-time and timer for the given time key
   * @param time TimerKey @default TimerService.defaultTime
   */
  onResetTimer(time = this.timerService.defaultTime()) {
    this.timerService.defaultTime.set(time);
    this.timerService.resetTimer(time);
  }

  /**
   * Play or Pause the timer
   * @param play boolean @default true
   */
  onPlay(play: boolean = true) {
    this.timerService.startTimer(play);
  }

  /**
   * Handles the close button
   * Emit close event to parent
   */
  onClose() {
    this.close.next();
  }
}
