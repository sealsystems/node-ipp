
import assert from 'assertthat';

import tags from '../../lib/tags';

suite('tags', () => {
    test('is an object', (done: any) => {
    assert.that(tags).is.ofType('object');
    done();
  });

    test('job-attributes-tag is 0x02', (done: any) => {
    assert.that(tags['job-attributes-tag']).is.equalTo(0x02);
    done();
  });

    test('integer is 0x21', (done: any) => {
    assert.that(tags.integer).is.equalTo(0x21);
    done();
  });

    test('uri is 0x45', (done: any) => {
    assert.that(tags.uri).is.equalTo(0x45);
    done();
  });

    test('memberAttrName is 0x4a', (done: any) => {
    assert.that(tags.memberAttrName).is.equalTo(0x4a);
    done();
  });
});
