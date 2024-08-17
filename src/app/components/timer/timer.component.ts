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
  @Output() click = new EventEmitter<void>();
  timerService = inject(TimerService);
  running: boolean = false;

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
    this.running = !this.running;
    this.timerService.startTimer(play);
  }

  onClick() {
    this.click.next();
  }
}
