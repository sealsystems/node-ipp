'use strict';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const http = require('http');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const https = require('https');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'url'.
const url = require('url');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isReadable... Remove this comment to see the full error message
const isReadableStream = require('./isReadableStream');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'parse'.
const parse = require('./parser');

const readResponse = (res: any, cb: any) => {
  const chunks: any = [];
  let length = 0;

  res.on('data', (chunk: any) => {
    length += chunk.length;
    chunks.push(chunk);
  });
  res.on('end', () => {
    try {
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
      const response = parse(Buffer.concat(chunks, length));
      delete response.operation;
      cb(null, response);
    } catch (e) {
      cb(e);
    }
  });
};

const pipeResponse = (res: any, writeableStream: any, cb: any) => {
  res.on('end', () => {
    cb(null, null);
  });
  res.pipe(writeableStream);
};

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'request'.
const request = (opts: any, buffer: any, writeableStream: any, cb: any) => {
  if (!cb) {
    cb = writeableStream;
    writeableStream = null;
  }
  const isStream = isReadableStream(buffer);

  // All IPP requires are POSTs- so we must have some data.
  //  10 is just a number I picked- this probably should have something more meaningful

  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'Buffer'. Did you mean 'buffer'?
  if (!isStream && (!Buffer.isBuffer(buffer) || buffer.length < 10)) {
    return cb(new Error('Data required'));
  }
  if (typeof opts === 'string') {
    opts = url.parse(opts);
  }
  if (!opts.port) {
    opts.port = 631;
  }

  if (!opts.headers) {
    opts.headers = {};
  }
  opts.headers['Content-Type'] = 'application/ipp';
  opts.method = 'POST';

  if (opts.protocol === 'ipp:') {
    opts.protocol = 'http:';
  }

  if (opts.protocol === 'ipps:') {
    opts.protocol = 'https:';
  }

  const req = (opts.protocol === 'https:' ? https : http).request(opts, (res: any) => {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    switch (res.statusCode) {
      case 100:
        if (opts.headers.Expect !== '100-Continue' || typeof opts.continue !== 'function') {
          cb(new Error(`Received unexpected response status ${res.statusCode} from the printer.`));
        }

        // console.log('100 Continue');
        return;
      case 200:
        if (writeableStream) {
          return pipeResponse(res, writeableStream, cb);
        }
        return readResponse(res, cb);
      default:
        // console.log(res.statusCode, 'response');
        cb(new Error(`Received unexpected response status ${res.statusCode} from the printer.`));
    }
  });

  if (opts.timeout) {
    req.setTimeout(opts.timeout, () => {
      const err = new Error(`connect ETIMEDOUT ${opts.host}`);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'code' does not exist on type 'Error'.
      err.code = 'ETIMEDOUT';
      req.destroy(err);
    });
  }

  req.on('error', (err: any) => {
    cb(err);
  });

  if (opts.headers.Expect === '100-Continue' && typeof opts.continue === 'function') {
    req.on('continue', () => {
      opts.continue(req);
    });
  }

  if (isStream) {
    buffer.pipe(req);
  } else {
    req.write(buffer);
    req.end();
  }
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = request;
