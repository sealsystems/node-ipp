'use strict';

//  To serialize and deserialize, we need to be able to look
//  things up by key or by value. This little helper just
//  converts the arrays to objects and tacks on a 'lookup' property.
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'xref'.
const xref = (arr: any, offset = 0) => {
  const obj = {};

  arr.forEach((item: any, index: any) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    obj[item] = index + offset;
  });
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'lookup' does not exist on type '{}'.
  obj.lookup = arr;

  return obj;
};

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'extend'.
const extend = (destination: any, source: any) => {
  for (const property in source) {
    if (source[property] && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }

  return destination;
};

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'exports'.
exports.extend = extend;
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'exports'.
exports.xref = xref;
