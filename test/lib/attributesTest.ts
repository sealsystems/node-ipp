
import assert from 'assertthat';

import attributes from '../../lib/attributes';

suite('attributes', () => {
    test('is an object', (done: any) => {
    assert.that(attributes).is.ofType('object');
    done();
  });

    suite('Operation', () => {
        test('is an object', (done: any) => {
            assert.that(attributes.Operation).is.ofType('object');
      done();
    });
        test('job-uri is an uri', (done: any) => {
            assert.that(attributes.Operation['job-uri']).is.equalTo({ type: 'uri', tag: 0x45, max: 1023 });
      done();
    });
  });
});
