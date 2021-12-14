'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'moment'.
const moment = require('moment');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'enums'.
const enums = require('./enums');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'statusCode... Remove this comment to see the full error message
const statusCodes = require('./statusCodes');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tags'.
const tags = require('./tags');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'operations... Remove this comment to see the full error message
const operations = enums['operations-supported'];
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'cupsOperat... Remove this comment to see the full error message
const cupsOperations = enums['cups-operations-supported'];
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RS'.
const RS = '\u001e';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'parser'.
const parser = (buf: any) => {
  const obj = {};
  let position = 0;
  const encoding = 'utf8';

  const read1 = (inPlace = false) => {
    if (position + 1 > buf.length) {
      throw new Error('NotEnoughData');
    }

    const val = buf[position];

    if (!inPlace) {
      position += 1;
    }

    return val;
  };

  const read2 = (inPlace = false) => {
    if (position + 2 > buf.length) {
      throw new Error('NotEnoughData');
    }
    const val = buf.readInt16BE(position, true);

    if (!inPlace) {
      position += 2;
    }

    return val;
  };

  const read4 = (inPlace = false) => {
    if (position + 4 > buf.length) {
      throw new Error('NotEnoughData');
    }
    const val = buf.readInt32BE(position, true);

    if (!inPlace) {
      position += 4;
    }

    return val;
  };

  const read = (length: any, enc: any, inPlace = false) => {
    if (length === 0) {
      return '';
    }
    if (position + length > buf.length) {
      throw new Error('NotEnoughData');
    }
    const start = position;

    if (!inPlace) {
      position += length;
    }

    return buf.toString(enc || encoding, start, position);
  };

  const readValue = (tag: any, name: any) => {
    const length = read2();
    let lang, subval, val;

    // http://tools.ietf.org/html/rfc2910#section-3.9
    switch (tag) {
      case tags.enum:
        val = read4();

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return (enums[name] && enums[name].lookup[val]) || val;
      case tags.integer:
        return read4();

      case tags.boolean:
        return Boolean(read1());

      case tags.rangeOfInteger:
        return [read4(), read4()];

      case tags.resolution:
        return [read4(), read4(), read1() === 0x03 ? 'dpi' : 'dpcm'];

      case tags.dateTime: {
        // http://tools.ietf.org/html/rfc1903 page 17
        const year = read2();
        const month = read1() - 1;
        const day = read1();
        const hour = read1();
        const minutes = read1();
        const seconds = read1();
        const millis = read1();
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
        const sign = String.fromCharCode(read(1));
        const timezone = read1() * 60 + read1();

        const dateTime = moment();
        dateTime.utcOffset(sign === '+' ? -1 * timezone : timezone);
        dateTime.year(year);
        dateTime.month(month);
        dateTime.date(day);
        dateTime.hour(hour);
        dateTime.minute(minutes);
        dateTime.second(seconds);
        dateTime.millisecond(millis);

        return new Date(dateTime.toISOString());
      }
      case tags.textWithLanguage:
      case tags.nameWithLanguage: {
        const optLangLength = read1(true);

        if (optLangLength === 0x00) {
          // Some printers (e.g. HP OfficeJet Pro 8710) give a length for the
          // group of language + value. In these cases we have to read the
          // length.
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
          lang = read(read2());
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
          subval = read(read2());
        } else {
          // Some printers (e.g. HP LaserJet CP1525nw color) start directly with
          // the language without giving the length for both. Thus we have to
          // use the current length.
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
          lang = read(length);
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
          subval = read(read2());
        }

        return lang + RS + subval;
      }
      case tags.nameWithoutLanguage:
      case tags.textWithoutLanguage:
      case tags.octetString:
      case tags.memberAttrName:
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
        return read(length);

      case tags.keyword:
      case tags.uri:
      case tags.uriScheme:
      case tags.charset:
      case tags.naturalLanguage:
      case tags.mimeMediaType:
        return read(length, 'ascii');

      case tags.begCollection:
        // the spec says a value could be present- but can be ignored
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
        read(length);

        /* eslint-disable no-use-before-define */
        return readCollection();
      /* eslint-enable no-use-before-define */

      case tags.unknown:
      case tags['no-value']:
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
        return read(0);

      default:
    }
  };

  const hasAdditionalValue = () => {
    const current = buf[position];

    return (
      // tags.memberAttrName
      current !== 0x4a &&
      // tags.endCollection
      current !== 0x37 &&
      // tags.end-of-attributes-tag
      current !== 0x03 &&
      buf[position + 1] === 0x00 &&
      buf[position + 2] === 0x00
    );
  };

  const readValues = (type: any, name: any) => {
    let value = readValue(type, name);

    if (hasAdditionalValue()) {
      value = [value];
      do {
        type = read1();

        // empty name
        read2();
        value.push(readValue(type, name));
      } while (hasAdditionalValue());
    }

    return value;
  };

  const readAttr = (group: any) => {
    let tag = read1();

    /* eslint-disable no-warning-comments */
    // TODO: find a test for this
    /* eslint-enable no-warning-comments */

    if (tag === 0x7f) {
      // tags.extension
      tag = read4();
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
    const name = read(read2());

    group[name] = readValues(tag, name);
  };

  const readGroup = (group: any) => {
    const name = tags.lookup[group];

    group = {};
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (obj[name]) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!Array.isArray(obj[name])) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        obj[name] = [obj[name]];
      }
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      obj[name].push(group);
    } else {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      obj[name] = group;
    }

    if (position >= buf.length) {
      throw new Error('NotEnoughData');
    }
    while (buf[position] >= 0x0f) {
      // delimiters are between 0x00 to 0x0F
      readAttr(group);
    }
  };

  const readGroups = () => {
    let group;

    /* eslint-disable no-cond-assign */
    while (position < buf.length && (group = read1()) !== 0x03) {
      /* eslint-enable no-cond-assign */
      // end-of-attributes-tag
      readGroup(group);
    }
    if (group !== 0x03) {
      throw new Error('NotEnoughData');
    }
  };

  const readCollectionItemValue = (name: any) => {
    let tag = read1();

    /* eslint-disable no-warning-comments */
    // TODO: find a test for this
    /* eslint-enable no-warning-comments */

    if (tag === 0x7f) {
      // tags.extension
      tag = read4();
    }

    // read valuetag name and discard it
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
    read(read2());

    return readValues(tag, name);
  };

  const readCollection = () => {
    let tag;
    const collection = {};

    /* eslint-disable no-cond-assign */
    while ((tag = read1()) !== 0x37) {
      /* eslint-enable no-cond-assign */
      // tags.endCollection
      if (tag !== 0x4a) {
        throw new Error(`unexpected: ${tags.lookup[tag]}`);
      }

      // read nametag name and discard it
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
      read(read2());
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const name = readValue(0x4a);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      const values = readCollectionItemValue();

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      collection[name] = values;
    }

    // Read endCollection name & value and discard it.
    // The spec says that they MAY have contents in the
    // future- so we can't assume they are empty.
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
    read(read2());
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
    read(read2());

    return collection;
  };

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{}'.
  obj.version = `${read1()}.${read1()}`;
  const bytes2and3 = read2();

  // byte[2] and byte[3] are used to define the 'operation' on
  // requests, but used to hold the statusCode on responses. We
  // can almost detect if it is a req or a res- but sadly, six
  // values overlap. In these cases, the parser will give both and
  // the consumer can ignore (or delete) whichever they don't want.

  if ((bytes2and3 >= 0x02 && bytes2and3 < 0x400) || bytes2and3 >= 0x4000) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'operation' does not exist on type '{}'.
    obj.operation = operations.lookup[bytes2and3] || cupsOperations.lookup[bytes2and3 - 0x4000];
  }

  if (bytes2and3 <= 0x0007 || bytes2and3 >= 0x0400) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusCode' does not exist on type '{}'.
    obj.statusCode = statusCodes.lookup[bytes2and3];
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
  obj.id = read4();
  readGroups();

  if (position < buf.length) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{}'.
    obj.data = buf.slice(position);
  }

  return obj;
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = parser;
