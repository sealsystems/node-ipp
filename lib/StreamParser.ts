
import { Transform } from 'stream';

import parse from './parser';

class StreamParser extends Transform {
  buf: any;
  emit: any;
  constructor(options: any) {
    super(options);
    this.buf = Buffer.alloc(0);
  }

  _transform(data: any, encoding: any, callback: any) {
    if (!this.buf) {
      return callback(null, data);
    }
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
      // @ts-ignore
      if (e.message === 'NotEnoughData') {
        return callback(null);
      }

      return callback(e);
    }
  }
}

export default StreamParser;
