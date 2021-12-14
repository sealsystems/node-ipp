'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isReadable... Remove this comment to see the full error message
const isReadableStream = function(stream: any) {
  return stream && typeof stream === 'object' && typeof stream.pipe === 'function' && typeof stream.read === 'function';
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = isReadableStream;
