"use strict";
// https://github.com/bbsimonbb/epoq
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateWithoutTime = void 0;
class DateWithoutTime {
    constructor(dateOrYearOrDaysSinceEpoch, month, day) {
        if (!isNaN(dateOrYearOrDaysSinceEpoch)) {
            if (month)
                this.utcMidnightDateObj = new Date(Date.UTC(dateOrYearOrDaysSinceEpoch, month, day));
            else
                this.utcMidnightDateObj = new Date(dateOrYearOrDaysSinceEpoch * 86400000);
        }
        else {
            // if no date supplied, use Now.
            if (!dateOrYearOrDaysSinceEpoch)
                dateOrYearOrDaysSinceEpoch = new Date();
            // if initDate specifies a timezone offset, or is already UTC, just keep the date part, reflecting the date _in that timezone_
            if (typeof dateOrYearOrDaysSinceEpoch === "string" && dateOrYearOrDaysSinceEpoch.match(/(-\d\d|(\+|-)\d{2}:\d{2}|Z)$/gm)) {
                this.utcMidnightDateObj = new Date(dateOrYearOrDaysSinceEpoch.substring(0, 10) + "T00:00:00Z");
            }
            else {
                // if init date is not already a date object, feed it to the date constructor.
                if (!(dateOrYearOrDaysSinceEpoch instanceof Date))
                    dateOrYearOrDaysSinceEpoch = new Date(dateOrYearOrDaysSinceEpoch);
                // Vital Step! Strip time part. Create UTC midnight dateObj according to local timezone.
                this.utcMidnightDateObj = new Date(Date.UTC(dateOrYearOrDaysSinceEpoch.getFullYear(), dateOrYearOrDaysSinceEpoch.getMonth(), dateOrYearOrDaysSinceEpoch.getDate()));
            }
        }
    }
    toISOString() {
        return this.utcMidnightDateObj.toISOString();
    }
    getDate() {
        return this.utcMidnightDateObj.getUTCDate();
    }
    getDay() {
        return this.utcMidnightDateObj.getUTCDay();
    }
    getFullYear() {
        return this.utcMidnightDateObj.getUTCFullYear();
    }
    getMonth() {
        return this.utcMidnightDateObj.getUTCMonth();
    }
    getDaysSinceEpoch() {
        return this.utcMidnightDateObj.getTime() / 86400000;
    }
    setDaysSinceEpoch(days) {
        this.utcMidnightDateObj = new Date(days * 86400000);
    }
    setDate(date) {
        return this.utcMidnightDateObj.setUTCDate(date);
    }
    setFullYear(year) {
        return this.utcMidnightDateObj.setUTCFullYear(year);
    }
    setMonth(arg) {
        return this.utcMidnightDateObj.setUTCMonth(arg);
    }
    addDays(days) {
        this.utcMidnightDateObj.setUTCDate(this.utcMidnightDateObj.getUTCDate() + days);
    }
    toString() {
        return this.utcMidnightDateObj.toString();
    }
    toLocaleDateString(locale, options) {
        options = options || {};
        Object.assign(options, { timeZone: "UTC" });
        return this.utcMidnightDateObj.toLocaleDateString(locale, options);
    }
}
exports.DateWithoutTime = DateWithoutTime;
