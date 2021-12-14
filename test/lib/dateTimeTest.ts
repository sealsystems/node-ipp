'use strict';

const assert = require('assertthat');
const moment = require('moment');

suite('attributes', () => {
  test('create correct iso time', async () => {
    const sign = '+';
    const timezone = 120;
    const dateTime = moment();
    dateTime.utcOffset(sign === '+' ? -1 * timezone : timezone);
    dateTime.month(4);
    dateTime.date(30);
    dateTime.hour(14);
    dateTime.minute(26);
    dateTime.second(0);
    dateTime.millisecond(0);
    dateTime.year(2021);

    const result = new Date(dateTime.toISOString()).toISOString();

    assert.that(result).is.equalTo('2021-05-30T16:26:00.000Z');
  });
});
