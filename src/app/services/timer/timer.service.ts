import { computed, EventEmitter, Injectable, signal } from '@angular/core';
import { TimerKey, TimerModel, TimerOption } from '../../models/model';

@Injectable()
export class TimerService {
  /** Instance: Time out Interval */
  interval!: NodeJS.Timeout | null;

  /** Instance: Default Time */
  defaultTime = signal<TimerKey>(20);

  /** Signal: To check if Timer is currently running */
  running = signal<boolean>(false);

  timerFinish = new EventEmitter<void>();

  /** Signal: Active Timer time */
  activeTime = signal<TimerModel>(
    TimerOption.get(this.defaultTime()) as TimerModel,
  );

  /** Signal: Updated Time string */
  timerString = computed(() => {
    const { hour, minute, second } = this.activeTime();
    return hour
      ? hour.toLocaleString('en-US', { minimumIntegerDigits: 2 }) + ':'
      : '' +
          minute.toLocaleString('en-US', { minimumIntegerDigits: 2 }) +
          ':' +
          second.toLocaleString('en-US', { minimumIntegerDigits: 2 });
  });

  /**
   * Allow user to reset the timer
   * Reset the timer-time to default or to given timer-option using timer-key
   * @param time TimerKey
   */
  resetTimer(time?: TimerKey) {
    this.running.set(false);
    if (this.interval) clearInterval(this.interval);
    this.activeTime.set(TimerOption.get(time as TimerKey) as TimerModel);
  }

  /**
   * Play or Pause the active Timer based on play flag
   * @param play boolean @default true
   * @returns void
   */
  startTimer(play: boolean = true) {
    if (!play) {
      // Pause Timer
      this.running.set(false);
      this.clearInterval();
      return;
    }
    this.running.set(true);

    this.clearInterval();

    const today = new Date();
    const { hour = 0, minute, second } = this.activeTime();
    const countDownDateTime = new Date();
    countDownDateTime.setHours(today.getHours() + hour);
    countDownDateTime.setMinutes(today.getMinutes() + minute);
    countDownDateTime.setSeconds(today.getSeconds() + second);

    this.interval = setInterval(() => {
      this.activeTime.set(this.getRemaining(countDownDateTime));
    }, 1000);
  }

  /**
   * Calculate and return the remaining time from the active-timer
   * @param countDownDateTime Date
   * @returns Updated Timer Model
   */
  getRemaining(countDownDateTime: Date): TimerModel {
    // Time to the date
    const today = new Date();
    const timeLeft = countDownDateTime.getTime() - today.getTime();

    // Check if timer is over
    if (countDownDateTime.getTime() < today.getTime()) {
      this.clearInterval();
      // Emit timer finish
      this.timerFinish.next();
      return { hour: 0, minute: 0, second: 0 };
    }

    let hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      ),
      minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
      seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { hour: hours, minute: minutes, second: seconds };
  }

  /**
   *  Clear Interval if not null
   */
  private clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
