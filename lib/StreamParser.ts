'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { Transform } = require('stream');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'parse'.
const parse = require('./parser');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'StreamPars... Remove this comment to see the full error message
class StreamParser extends Transform {
  buf: any;
  emit: any;
  constructor(options: any) {
    super(options);
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    this.buf = Buffer.alloc(0);
  }

  _transform(data: any, encoding: any, callback: any) {
    if (!this.buf) {
      return callback(null, data);
    }
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    this.buf = Buffer.concat([this.buf, data]);

    try {
      const message = parse(this.buf);
      const streamData = message.data;

      delete message.data;
      this.buf = null;
      this.emit('attributes', message);

      if (streamData && streamData.length > 0) {
        return callback(null, streamData);
      }

      return callback(null);
    } catch (e) {
      if (e.message === 'NotEnoughData') {
        return callback(null);
      }

      return callback(e);
    }
  }
}

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = StreamParser;
