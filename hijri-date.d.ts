declare module 'hijri-date/lib/safe' {
  class HijriDate extends Date {
    constructor(date?: Date | string | number);
    getDate(): number;
    getMonth(): number;
    getFullYear(): number;
  }

  export default HijriDate;
}
