'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'attributes... Remove this comment to see the full error message
const attributes = require('./attributes');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'enums'.
const enums = require('./enums');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'keywords'.
const keywords = require('./keywords');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'operations... Remove this comment to see the full error message
const operations = require('./enums')['operations-supported'];
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'cupsOperat... Remove this comment to see the full error message
const cupsOperations = require('./enums')['cups-operations-supported'];
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'statusCode... Remove this comment to see the full error message
const statusCodes = require('./statusCodes');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tags'.
const tags = require('./tags');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'versions'.
const versions = require('./versions');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isReadable... Remove this comment to see the full error message
const isReadableStream = require('./isReadableStream');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RS'.
const RS = '\u001e';

const random = () => {
  return Number(
    Math.random()
      .toString()
      .substr(-8)
  );
};

const timezone = (d: any) => {
  const z = d.getTimezoneOffset();

  return [z > 0 ? '-' : '+', ~~(Math.abs(z) / 60), Math.abs(z) % 60];
};

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'serializer... Remove this comment to see the full error message
const serializer = (msg: any) => {
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
  let buf = Buffer.alloc(10240);
  let position = 0;

  const checkBufferSize = (length: any) => {
    if (position + length > buf.length) {
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
      buf = Buffer.concat([buf], 2 * buf.length);
    }
  };

  const write1 = (val: any) => {
    checkBufferSize(1);
    buf.writeUInt8(val, position);
    position += 1;
  };

  const write2 = (val: any) => {
    checkBufferSize(2);
    buf.writeUInt16BE(val, position);
    position += 2;
  };

  const write4 = (val: any) => {
    checkBufferSize(4);
    if (val < 0) {
      val += 0x100000000;
    }
    buf.writeUInt32BE(val, position);
    position += 4;
  };

  // write a string to the buffer
  const writeStr = (str: any, enc: any) => {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    const length = Buffer.byteLength(str);

    checkBufferSize(length);
    buf.write(str, position, length, enc || 'utf8');
    position += length;
  };

  // write a string to the buffer, prefixing it with the size of the buffer
  const write = (str: any, enc: any) => {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    const length = Buffer.byteLength(str);

    write2(length);
    checkBufferSize(length);
    buf.write(str, position, length, enc || 'utf8');
    position += length;
  };

  const special = { 'attributes-charset': 1, 'attributes-natural-language': 2 };

  const groupmap = {
    'job-attributes-tag': ['Job Template', 'Job Description'],
    'operation-attributes-tag': ['Operation', 'SEAL Operation'],
    'printer-attributes-tag': 'Printer Description',
    'unsupported-attributes-tag': '',
    'subscription-attributes-tag': 'Subscription Description',
    'event-notification-attributes-tag': 'Event Notifications',
    'resource-attributes-tag': '',
    'document-attributes-tag': 'Document Description'
  };

  const resolveAlternates = (array: any, name: any, value: any) => {
    switch (array.alts) {
      case 'keyword,name':
      case 'keyword,name,novalue':
        if (value === null && array.lookup.novalue) {
          return array.lookup.novalue;
        }

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return keywords[name].indexOf(value) !== -1 ? array.lookup.keyword : array.lookup.name;

      case 'integer,rangeOfInteger':
        return Array.isArray(value) ? array.lookup.rangeOfInteger : array.lookup.integer;

      case 'dateTime,novalue':
        return !isNaN(Date.parse(value)) ? array.lookup.dateTime : array.lookup.novalue;

      case 'integer,novalue':
        return !isNaN(value) ? array.lookup.integer : array.lookup.novalue;

      case 'name,novalue':
        return value !== null ? array.lookup.name : array.lookup.novalue;

      case 'novalue,uri':
        return value !== null ? array.lookup.uri : array.lookup.novalue;

      case 'enumeration,unknown':
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return enums[name][value] ? array.lookup.enumeration : array.lookup.unknown;

      case 'enumeration,novalue':
        return value !== null ? array.lookup.enumeration : array.lookup.novalue;

      case 'collection,novalue':
        return value !== null ? array.lookup.enumeration : array.lookup.novalue;

      default:
        throw new Error('Unknown atlernates');
    }
  };

  const getTag = (syntax: any, name: any, value: any) => {
    let tag = syntax.tag;

    if (!tag) {
      const hasRS = Boolean(value.indexOf(RS) !== -1);

      tag = tags[`${syntax.type + (hasRS ? 'With' : 'Without')}Language`];
    }

    return tag;
  };

  const writeValue = (tag: any, value: any, submembers: any) => {
    let parts, tz;

    switch (tag) {
      case tags.enum:
        write2(0x0004);
        write4(value);

        return;

      case tags.integer:
        write2(0x0004);
        write4(value);

        return;

      case tags.boolean:
        write2(0x0001);

        write1(Number(value));

        return;

      case tags.rangeOfInteger:
        write2(0x0008);
        write4(value[0]);
        write4(value[1]);

        return;

      case tags.resolution:
        write2(0x0009);
        write4(value[0]);
        write4(value[1]);
        write1(value[2] === 'dpi' ? 0x03 : 0x04);

        return;

      case tags.dateTime:
        write2(0x000b);
        write2(value.getFullYear());
        write1(value.getMonth() + 1);
        write1(value.getDate());
        write1(value.getHours());
        write1(value.getMinutes());
        write1(value.getSeconds());
        write1(Math.floor(value.getMilliseconds() / 100));
        tz = timezone(value);

        // + or -
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        writeStr(tz[0]);

        // hours
        write1(tz[1]);

        // minutes
        write1(tz[2]);

        return;

      case tags.textWithLanguage:
      case tags.nameWithLanguage:
        parts = value.split(RS);

        write2(parts[0].length);
        write2(parts[0]);
        write2(parts[1].length);
        write2(parts[1]);

        return;

      case tags.nameWithoutLanguage:
      case tags.textWithoutLanguage:
      case tags.octetString:
      case tags.memberAttrName:
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return write(value);

      case tags.keyword:
      case tags.uri:
      case tags.uriScheme:
      case tags.charset:
      case tags.naturalLanguage:
      case tags.mimeMediaType:
        return write(value, 'ascii');

      case tags.begCollection:
        // empty value
        write2(0);
        /* eslint-disable no-use-before-define */
        writeCollection(value, submembers);
        /* eslint-enable no-use-before-define */

        return;

      case tags['no-value']:
        // empty value? I can't find where this is defined in any spec.
        return write2(0);

      default:
        throw new Error(`${tag} not handled`);
    }
  };

  const writeCollection = (value: any, members: any) => {
    Object.keys(value).forEach((key) => {
      let subvalue = value[key];
      let subsyntax = members[key];

      // Ignore unknown collection members.
      if (!subsyntax) {
        return;
      }

      if (Array.isArray(subsyntax)) {
        subsyntax = resolveAlternates(subsyntax, key, subvalue);
      }

      const tag = getTag(subsyntax, key, subvalue);

      if (tag === tags.enum) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        subvalue = enums[key][subvalue];
      }

      write1(tags.memberAttrName);

      // empty name
      write2(0);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      writeValue(tags.memberAttrName, key);
      write1(tag);

      // empty name
      write2(0);
      writeValue(tag, subvalue, subsyntax.members);
    });
    write1(tags.endCollection);

    // empty name
    write2(0);

    // empty value
    write2(0);
  };

  const attr = (group: any, name: any, obj: any) => {
    const groupName = Array.isArray(group)
      ? group.find((grp) => {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          return attributes[grp][name];
        })
      : group;

    // Ignore unknown attributes.
    if (!groupName) {
      return;
    }

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const syntax = attributes[groupName][name];

    // Ignore unknown attributes.
    if (!syntax) {
      return;
    }

    let values = obj[name];

    if (!Array.isArray(values)) {
      values = [values];
    }

    values.forEach((value: any, i: any) => {
      // we need to re-evaluate the alternates every time
      const syntax2 = Array.isArray(syntax) ? resolveAlternates(syntax, name, value) : syntax;
      const tag = getTag(syntax2, name, value);

      if (tag === tags.enum) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        value = enums[name][value];
      }

      write1(tag);
      if (i === 0) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        write(name);
      } else {
        // empty name
        write2(0x0000);
      }

      writeValue(tag, value, syntax2.members);
    });
  };

  const writeGroup = (tag: any) => {
    // support writing multiple sets of the same group with an Array
    const groupsOrAttrs = msg[tag];

    if (!groupsOrAttrs) {
      return;
    }

    const attributeGroups = Array.isArray(groupsOrAttrs) ? groupsOrAttrs : [groupsOrAttrs];

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const groupname = groupmap[tag];

    attributeGroups.forEach((attrs) => {
      let keys = Object.keys(attrs);

      // 'attributes-charset' and 'attributes-natural-language' need to come first- so we sort them to the front
      if (tag === tags['operation-attributes-tag']) {
        keys = keys.sort((a, b) => {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          return (special[a] || 3) - (special[b] || 3);
        });
      }

      write1(tags[tag]);
      keys.forEach((name) => {
        attr(groupname, name, attrs);
      });
    });
  };

  write2(versions[msg.version || '2.0']);
  write2(msg.operation ? operations[msg.operation] || cupsOperations[msg.operation] : statusCodes[msg.statusCode]);

  // request-id
  write4(msg.id || random());

  writeGroup('operation-attributes-tag');
  writeGroup('job-attributes-tag');
  writeGroup('printer-attributes-tag');
  writeGroup('document-attributes-tag');
  writeGroup('subscription-attributes-tag');
  writeGroup('event-notification-attributes-tag');

  /* eslint-disable no-warning-comments */
  // TODO... add the others
  /* eslint-enable no-warning-comments */

  // end
  write1(0x03);

  if (!msg.data || isReadableStream(msg.data)) {
    return buf.slice(0, position);
  }

  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
  if (!Buffer.isBuffer(msg.data)) {
    throw new Error('Data must be a Buffer or a stream.Readable.');
  }

  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
  const buf2 = Buffer.alloc(position + msg.data.length);

  buf.copy(buf2, 0, 0, position);
  msg.data.copy(buf2, position, 0);

  return buf2;
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = serializer;
