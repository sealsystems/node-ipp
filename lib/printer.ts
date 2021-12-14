'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const parseurl = require('url').parse;
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PassThroug... Remove this comment to see the full error message
const { PassThrough } = require('stream');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'extend'.
const extend = require('./ipputil').extend;
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'request'.
const request = require('./request');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'serialize'... Remove this comment to see the full error message
const serialize = require('./serializer');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isReadable... Remove this comment to see the full error message
const isReadableStream = require('./isReadableStream');

/* eslint-disable no-implicit-globals */
/* eslint-disable func-style */
function Printer(this: any, url: any, opts: any) {
  /* eslint-enable no-implicit-globals */
  /* eslint-enable func-style */
  if (!(this instanceof Printer)) {
    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    return new Printer(url, opts);
  }
  opts = opts || {};
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'url' does not exist on type '{}'.
  this.url = typeof url === 'string' ? parseurl(url) : url;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{}'.
  this.version = opts.version || '2.0';
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'uri' does not exist on type '{}'.
  this.uri = opts.uri || `${this.url.protocol}//${this.url.host}${this.url.path}`;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'charset' does not exist on type '{}'.
  this.charset = opts.charset || 'utf-8';
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'language' does not exist on type '{}'.
  this.language = opts.language || 'en-us';
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'url' does not exist on type '{}'.
  this.url.auth = opts.auth;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'url' does not exist on type '{}'.
  this.url.timeout = opts.timeout ? opts.timeout : 60000;
}

Printer.prototype = {
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
        'printer-uri': this.uri
      }
    };

    // these are required to be in this order

    if (msg && msg['operation-attributes-tag']['job-id']) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      base['operation-attributes-tag']['job-id'] = msg['operation-attributes-tag']['job-id'];
    } else if (msg && msg['operation-attributes-tag']['job-uri']) {
      // yes, this gets done in extend() - however, by doing this now, we define the position in the result object.
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      base['operation-attributes-tag']['job-uri'] = msg['operation-attributes-tag']['job-uri'];
    }

    msg = extend(base, msg);
    if (msg['operation-attributes-tag']['job-uri']) {
      delete msg['operation-attributes-tag']['printer-uri'];
    }

    return msg;
  },
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

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Printer;
