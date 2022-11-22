import { DateWithoutTime as DateWT } from "./DateWithoutTime.js";

export class Habit {
  private _id: string;
  private _streak: number;
  constructor(public name: string, private _dates: string[] = []) {
    this._id = "habit-" + this.name.toLowerCase().split(" ").join("-");
    this._streak = 0;
  }
  get streak() {
    return this._streak;
  }
  get dates() {
    return this._dates;
  }
  get id() {
    return this._id;
  }
  addDate(dateStr: string) {
    if (this._dates.includes(dateStr)) return;
    const dateRegex = new RegExp(
      /^[1-9]\d{3}-((0[1-9])|(1[0-2]))-([0-2][1-9]|3[0-1])$/
    );
    if (
      new DateWT(dateStr).toString() === "Invalid Date" ||
      !dateRegex.test(dateStr)
    ) {
      throw new Error("Invalid date");
    }
    const dates = this._dates;

    if (dateStr > dates[dates.length - 1]) dates.push(dateStr);
    else if (dateStr < dates[0]) dates.unshift(dateStr);
    else {
      let i = 0;
      while (dates[i] < dateStr) i++;
      dates.splice(i, 0, dateStr);
    }
  }
  removeDate(date: string) {
    const index = this._dates.indexOf(date);
    if (index !== -1) this._dates.splice(index, 1);
  }
  isDuplicate(name: string) {
    const temp = new Habit(name);
    return temp.id === this.id;
  }
}
