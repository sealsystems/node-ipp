
import assert from 'assertthat';

import statusCodes from '../../lib/statusCodes';

suite('statusCodes', () => {
    test('is an object', (done: any) => {
    assert.that(statusCodes).is.ofType('object');
    done();
  });

    test('server-error-busy is 0x0507', (done: any) => {
    assert.that(statusCodes['server-error-busy']).is.equalTo(0x0507);
    done();
  });
});
