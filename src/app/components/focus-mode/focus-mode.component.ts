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
  @Output() close = new EventEmitter<void>();
  timerService = inject(TimerService);
  running=this.timerService.running

  timeString = computed(() => {
    const { hour, minute, second } = this.timerService.activeTime();
    return hour
      ? hour.toLocaleString('en-US', { minimumIntegerDigits: 2 }) + ':'
      : '' +
          minute.toLocaleString('en-US', { minimumIntegerDigits: 2 }) +
          ':' +
          second.toLocaleString('en-US', { minimumIntegerDigits: 2 });
  });

  onResetTimer(time = this.timerService.defaultTime) {
    this.timerService.resetTimer(time);
  }

  onPlay(play: boolean = true) {
    this.timerService.startTimer(play);
  }

  onClose() {
    this.close.next();
  }
}
