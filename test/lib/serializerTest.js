'use strict';

const PassThrough = require('stream').PassThrough;

const assert = require('assertthat');

const serializer = require('../../lib/serializer');
const parser = require('../../lib/parser');

const assertBufferEqual = function (buf1, buf2) {
  assert.that(buf1.length).is.equalTo(buf2.length);
  for (let i = 0; i < buf1.length; i++) {
    assert.that(buf1[i]).is.equalTo(buf2[i]);
  }

  return true;
};

suite('serializer', () => {
  let msg;
  let result;

  setup((done) => {
    msg = {
      id: 42,
      'operation-attributes-tag': {
        'job-name': 'Hugos Job'
      }
    };
    result = Buffer.from([
      2, 0, 0, 0, 0, 0, 0, 42, 1, 66, 0, 8, 106, 111, 98, 45, 110, 97, 109, 101, 0, 9, 72, 117, 103, 111, 115, 32, 74,
      111, 98, 3
    ]);
    done();
  });

  test('is a function', (done) => {
    assert.that(serializer).is.ofType('function');
    done();
  });

  test('returns buffer', (done) => {
    const buf = serializer(msg);

    assertBufferEqual(buf, result);
    done();
  });

  test('ignores stream', (done) => {
    msg.data = new PassThrough();

    msg.data.write('huhu');

    const buf = serializer(msg);

    assertBufferEqual(buf, result);
    done();
  });

  test('adds buffer data', (done) => {
    msg.data = Buffer.from('abc', 'ascii');

    const buf = serializer(msg);
    const resultWithData = Buffer.concat([result, msg.data]);

    assert.that(buf.length).is.equalTo(result.length + 3);
    assertBufferEqual(buf, resultWithData);
    done();
  });

  test('throws error if data if neither stream nor buffer', (done) => {
    msg.data = 'wrong!';

    assert
      .that(() => {
        serializer(msg);
      })
      .is.throwing('Data must be a Buffer or a stream.Readable.');

    done();
  });

  test('adds seal specific attributes', async () => {
    msg['operation-attributes-tag']['seal-attributes'] = ['a=b', 'a2=b2'];
    msg['operation-attributes-tag']['seal-attributes-v2'] = ['a3=b3'];
    const data = serializer(msg);

    const parsed = parser(data);

    assert.that(parsed['operation-attributes-tag']['seal-attributes']).is.equalTo(['a=b', 'a2=b2']);
    assert.that(parsed['operation-attributes-tag']['seal-attributes-v2']).is.equalTo('a3=b3');
  });
});
