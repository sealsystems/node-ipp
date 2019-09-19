'use strict';

const util = require('./lib/ipputil'),
  parse = require('./lib/parser.js'),
  serialize = require('./lib/serializer.js'),
  request = require('./lib/request.js'),
  Printer = require('./lib/printer.js'),
  versions = require('./lib/versions.js'),
  attributes = require('./lib/attributes.js'),
  keywords = require('./lib/keywords.js'),
  enums = require('./lib/enums.js'),
  tags = require('./lib/tags.js'),
  statusCodes = require('./lib/statusCodes.js'),
  StreamParser = require('./lib/StreamParser.js');

module.exports = {
  parse,
  serialize,
  request,
  Printer,
  versions,
  attributes,
  keywords,
  enums,
  tags,
  statusCodes,
  StreamParser
};
module.exports.operations = module.exports.enums['operations-supported'];
module.exports.attribute = {
  // http://www.iana.org/assignments/ipp-registrations/ipp-registrations.xml#ipp-registrations-7
  groups: util.xref(module.exports.tags.lookup.slice(0x00, 0x0f)),

  // http://www.iana.org/assignments/ipp-registrations/ipp-registrations.xml#ipp-registrations-8
  values: util.xref(module.exports.tags.lookup.slice(0x10, 0x1f)),

  // http://www.iana.org/assignments/ipp-registrations/ipp-registrations.xml#ipp-registrations-9
  syntaxes: util.xref(module.exports.tags.lookup.slice(0x20))
};
