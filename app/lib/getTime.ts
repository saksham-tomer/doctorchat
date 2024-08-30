interface Time {
  getTime: () => string;
  time: Date;
  hours: number;
  minutes: number;
  formattedHours: string;
  formattedMinutes: string;
  sendTime: string;
}

export class GetTime implements Time {
  time: Date;
  hours: number;
  minutes: number;
  formattedHours: string;
  formattedMinutes: string;
  sendTime: string;

  constructor() {
    this.time = new Date();
    this.hours = this.time.getHours();
    this.minutes = this.time.getMinutes();
    this.formattedHours = this.hours.toString().padStart(2, "0");
    this.formattedMinutes = this.minutes.toString().padStart(2, "0");
    this.sendTime = `${this.formattedHours}:${this.formattedMinutes}`;
  }

  getTime(): string {
    return this.sendTime;
  }

  static getTime(): string {
    const timeInstance = new GetTime();
    return timeInstance.getTime();
  }
}
