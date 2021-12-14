'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PassThroug... Remove this comment to see the full error message
const PassThrough = require('stream').PassThrough;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');

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
suite('serializer', () => {
  let msg: any;
  let result: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'setup'.
  setup((done: any) => {
    msg = {
      id: 42,
      'operation-attributes-tag': {
        'job-name': 'Hugos Job'
      }
    };
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    result = Buffer.from([
      2,
      0,
      0,
      0,
      0,
      0,
      0,
      42,
      1,
      66,
      0,
      8,
      106,
      111,
      98,
      45,
      110,
      97,
      109,
      101,
      0,
      9,
      72,
      117,
      103,
      111,
      115,
      32,
      74,
      111,
      98,
      3
    ]);
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('is a function', (done: any) => {
    assert.that(serializer).is.ofType('function');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('returns buffer', (done: any) => {
    const buf = serializer(msg);

    assertBufferEqual(buf, result);
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('ignores stream', (done: any) => {
    msg.data = new PassThrough();

    msg.data.write('huhu');

    const buf = serializer(msg);

    assertBufferEqual(buf, result);
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('adds buffer data', (done: any) => {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    msg.data = Buffer.from('abc', 'ascii');

    const buf = serializer(msg);
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    const resultWithData = Buffer.concat([result, msg.data]);

    assert.that(buf.length).is.equalTo(result.length + 3);
    assertBufferEqual(buf, resultWithData);
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('throws error if data if neither stream nor buffer', (done: any) => {
    msg.data = 'wrong!';

    assert
      .that(() => {
        serializer(msg);
      })
      .is.throwing('Data must be a Buffer or a stream.Readable.');

    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('adds seal specific attributes', async () => {
    msg['operation-attributes-tag']['seal-attributes'] = ['a=b', 'a2=b2'];
    msg['operation-attributes-tag']['seal-attributes-v2'] = ['a3=b3'];
    const data = serializer(msg);

    const parsed = parser(data);

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    assert.that(parsed['operation-attributes-tag']['seal-attributes']).is.equalTo(['a=b', 'a2=b2']);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    assert.that(parsed['operation-attributes-tag']['seal-attributes-v2']).is.equalTo('a3=b3');
  });
});
