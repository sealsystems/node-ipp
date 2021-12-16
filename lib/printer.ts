
import { parse as parseurl, UrlWithStringQuery } from 'url';
const { PassThrough } = require('stream');

const extend = require('./ipputil').extend;
const request = require('./request');
const serialize = require('./serializer');
const isReadableStream = require('./isReadableStream');

/* eslint-disable no-implicit-globals */
/* eslint-disable func-style */
class Printer {
  url?: UrlWithStringQuery & { timeout: number };
  version?: string;
  uri?: string;
  charset?: string;
  language?: string;

  constructor(url: any, opts: any) {
    /* eslint-enable no-implicit-globals */
    /* eslint-enable func-style */
    if (!(this instanceof Printer)) {
      return new Printer(url, opts);
    }
    opts = opts || {};

    const urlObj = typeof url === 'string' ? parseurl(url) : url;
    this.version = opts.version || '2.0';
    this.uri = opts.uri || `${urlObj.protocol}//${urlObj.host}${urlObj.path}`;
    this.charset = opts.charset || 'utf-8';
    this.language = opts.language || 'en-us';
    urlObj.auth = opts.auth;
    urlObj.timeout = opts.timeout ? opts.timeout : 60000;

    this.url = urlObj
  }

  message(operation: any, msg: any) {
    if (typeof operation === 'undefined') {
      operation = 'Get-Printer-Attributes';
    }

    const base = {
      version: this.version,
      operation,

      // will get added by serializer if one isn't given
      id: null,
      'operation-attributes-tag': {
        // these are required to be in this order
        'attributes-charset': this.charset,
        'attributes-natural-language': this.language,
        'printer-uri': this.uri,
        'job-id': undefined,
        'job-uri': undefined,
      }
    };

    // these are required to be in this order

    if (msg && msg['operation-attributes-tag']['job-id']) {
      base['operation-attributes-tag']['job-id'] = msg['operation-attributes-tag']['job-id'];
    } else if (msg && msg['operation-attributes-tag']['job-uri']) {
      // yes, this gets done in extend() - however, by doing this now, we define the position in the result object.
      base['operation-attributes-tag']['job-uri'] = msg['operation-attributes-tag']['job-uri'];
    }

    msg = extend(base, msg);
    if (msg['operation-attributes-tag']['job-uri']) {
      delete msg['operation-attributes-tag']['printer-uri'];
    }

    return msg;
  }

  execute(operation: any, msg: any, cb: any) {
    msg = this.message(operation, msg);
    const buf = serialize(msg);

    //		console.log(buf.toString('hex'));
    //		console.log(JSON.stringify(
    //			require('./parser')(buf), null, 2
    //		));

    if (msg.data && isReadableStream(msg.data)) {
      const stream = new PassThrough();

      request(this.url, stream, msg.output, cb);
      stream.write(buf);

      return msg.data.pipe(stream);
    }
    request(this.url, buf, msg.output, cb);
  }
};

module.exports = Printer;
