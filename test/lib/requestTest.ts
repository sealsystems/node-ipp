'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PassThroug... Remove this comment to see the full error message
const PassThrough = require('stream').PassThrough;
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'url'.
const url = require('url');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const express = require('express');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const freeport = require('freeport');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const rawBody = require('raw-body');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'request'.
const request = require('../../lib/request');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'serializer... Remove this comment to see the full error message
const serializer = require('../../lib/serializer');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'parser'.
const parser = require('../../lib/parser');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assertBuff... Remove this comment to see the full error message
const assertBufferEqual = function(buf1: any, buf2: any) {
  assert.that(buf1.length).is.equalTo(buf2.length);
  for (let i = 0; i < buf1.length; i++) {
    assert.that(buf1[i]).is.equalTo(buf2[i]);
  }

  return true;
};

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
suite('request', () => {
  let port: any;
  let requestMsg: any;
  let responseMsg: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'setup'.
  setup((done: any) => {
    freeport((errPort: any, aFreePort: any) => {
      assert.that(errPort).is.null();

      port = aFreePort;
      requestMsg = {
        version: '2.0',
        operation: 'Get-Job-Attributes',
        id: 987,
        'operation-attributes-tag': {
          // these are required to be in this order
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en-us',
          'job-uri': `ipp://localhost:${port}/jobs/06acd811-fe8a-407f-9fd3-628f0c23c1d8`
        }
      };
      responseMsg = {
        version: '2.0',
        statusCode: 'successful-ok',
        id: 987,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en'
        },
        'job-attributes-tag': {
          'job-id': 111,
          'job-state': 'processing',
          'job-uri': `ipp://localhost:${port}/jobs/06acd811-fe8a-407f-9fd3-628f0c23c1d8`
        }
      };
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('is a function', (done: any) => {
    assert.that(request).is.ofType('function');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('POST buffer data', (done: any) => {
    const reqBuf = serializer(requestMsg);
    const app = express();

    app.post('/jobs/:job', (req: any, res: any) => {
      assert.that(req.params.job).is.equalTo('06acd811-fe8a-407f-9fd3-628f0c23c1d8');
      assert.that(req.headers['transfer-encoding']).is.equalTo('chunked');
      rawBody(req, {}, (errBody: any, body: any) => {
        assert.that(errBody).is.null();
        assertBufferEqual(body, reqBuf);
        res.end(serializer(responseMsg));
      });
    });

    app.listen(port, (errListen: any) => {
      assert.that(errListen).is.undefined();

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
      request(url.parse(requestMsg['operation-attributes-tag']['job-uri']), reqBuf, (errRequest: any, res: any) => {
        assert.that(res).is.equalTo(responseMsg);
        done();
      });
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('POST stream data', (done: any) => {
    const myStream = new PassThrough();
    const reqBuf = serializer(requestMsg);
    const app = express();

    app.post('/jobs/:job', (req: any, res: any) => {
      assert.that(req.params.job).is.equalTo('06acd811-fe8a-407f-9fd3-628f0c23c1d8');
      assert.that(req.headers['transfer-encoding']).is.equalTo('chunked');
      rawBody(req, {}, (errBody: any, body: any) => {
        assert.that(errBody).is.null();
        assertBufferEqual(body, reqBuf);
        res.end(serializer(responseMsg));
      });
    });

    app.listen(port, (errListen: any) => {
      assert.that(errListen).is.undefined();

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
      request(url.parse(requestMsg['operation-attributes-tag']['job-uri']), myStream, (errRequest: any, res: any) => {
        assert.that(errRequest).is.equalTo(null);
        assert.that(res).is.equalTo(responseMsg);
        done();
      });
      myStream.write(reqBuf);
      myStream.end();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('POST stream data with parsing error', (done: any) => {
    const myStream = new PassThrough();
    const reqBuf = serializer(requestMsg);
    const app = express();

    app.post('/jobs/:job', (req: any, res: any) => {
      assert.that(req.params.job).is.equalTo('06acd811-fe8a-407f-9fd3-628f0c23c1d8');
      assert.that(req.headers['transfer-encoding']).is.equalTo('chunked');
      rawBody(req, {}, (errBody: any, body: any) => {
        assert.that(errBody).is.null();
        assertBufferEqual(body, reqBuf);
        const newBuf = serializer(responseMsg);
        res.end(newBuf.slice(0, 1));
      });
    });

    app.listen(port, (errListen: any) => {
      assert.that(errListen).is.undefined();

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
      request(url.parse(requestMsg['operation-attributes-tag']['job-uri']), myStream, (errRequest: any, res: any) => {
        assert.that(errRequest.message).is.equalTo('NotEnoughData');
        assert.that(res).is.undefined();
        done();
      });
      myStream.write(reqBuf);
      myStream.end();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Stream response data', (done: any) => {
    const reqBuf = serializer(requestMsg);
    const app = express();

    app.post('/jobs/:job', (req: any, res: any) => {
      assert.that(req.params.job).is.equalTo('06acd811-fe8a-407f-9fd3-628f0c23c1d8');
      assert.that(req.headers['transfer-encoding']).is.equalTo('chunked');
      rawBody(req, {}, (errBody: any, body: any) => {
        assert.that(errBody).is.null();
        assertBufferEqual(body, reqBuf);
        res.end(serializer(responseMsg));
      });
    });

    app.listen(port, (errListen: any) => {
      assert.that(errListen).is.undefined();
      let requestFinished = false;
      let outputFinished = false;
      const responses: any = [];
      const output = new PassThrough();
      output.on('data', (chunk: any) => {
        responses.push(chunk);
      });
      output.once('end', () => {
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
        const response = parser(Buffer.concat(responses));
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'operation' does not exist on type '{}'.
        delete response.operation;
        assert.that(response).is.equalTo(responseMsg);
        outputFinished = true;
        if (requestFinished) {
          return done();
        }
      });

      request(url.parse(requestMsg['operation-attributes-tag']['job-uri']), reqBuf, output, (errRequest: any, res: any) => {
        assert.that(errRequest).is.equalTo(null);
        assert.that(res).is.equalTo(null);
        requestFinished = true;
        if (outputFinished) {
          return done();
        }
      });
    });
  });
});
