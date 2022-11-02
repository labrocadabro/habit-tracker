"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habit = void 0;
const DateWithoutTime_js_1 = require("./DateWithoutTime.js");
class Habit {
    constructor(name, id, _dates = [], _streak = 0) {
        this.name = name;
        this.id = id;
        this._dates = _dates;
        this._streak = _streak;
    }
    get streak() {
        return this._streak;
    }
    get dates() {
        return this._dates;
    }
    addDate(dateStr) {
        if (this._dates.includes(dateStr))
            return;
        const dateRegex = new RegExp(/^[1-9]\d{3}-((0[1-9])|(1[0-2]))-([0-2][1-9]|3[0-1])$/);
        const date = new DateWithoutTime_js_1.DateWithoutTime(dateStr);
        if (date.toString() === "Invalid Date" || !dateRegex.test(dateStr)) {
            throw new Error('Invalid date');
        }
        const dates = this._dates;
        if (dateStr > dates[dates.length - 1])
            dates.push(dateStr);
        else if (dateStr < dates[0])
            dates.unshift(dateStr);
        else {
            let i = 0;
            while (dates[i] < dateStr)
                i++;
            dates.splice(i, 0, dateStr);
        }
    }
    removeDate(date) {
        const index = this._dates.indexOf(date);
        if (index !== -1)
            this._dates.splice(index, 1);
    }
}
exports.Habit = Habit;
