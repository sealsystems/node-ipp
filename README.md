# @sealsystems/ipp - Internet Printing Protocol (IPP) for Node.js

[![NPM](https://img.shields.io/npm/v/@sealsystems/ipp.svg)](https://www.npmjs.com/package/@sealsystems/ipp)

A pure Javascript implementation of the IPP/2.0 protocol.

The IPP protocol was started in the 90's and is still being worked on today. It is a very indepth protocol that spans many
RFCs- some of which are dead while others were herded into IPP/v2.x.

There are millions of printers that support IPP. If you have one, this module will allow you to send/recieve data to/from
the printer.

To find out if your printer supports IPP:

* Google your printer's specs
* Try: `telnet YOUR_PRINTER 631`. If it connects, that's a good sign.
* Use the ['/examples/findPrinters.js'](https://github.com/williamkapke/ipp/tree/master/examples/findPrinters.js) script.

I have a pretty good starting point here. I created reference files
(`attributes`, `enums`, `keywords`, `operations`, `statusCodes`, `versions` and `tags`) and tried to include as many
links in the comments to the ref docs as I could.

## Install

```bash
$ npm install @sealsystems/ipp
```

## Usage

### Printer(url [,options])

```javascript
const ipp = require('@sealsystems/ipp');
const PDFDocument = require('pdfkit');

//make a PDF document
const doc = new PDFDocument({ margin: 0 });
doc.text('.', 0, 780);

doc.output(function(pdf) {
  const printer = ipp.Printer('http://NPI977E4E.local.:631/ipp/printer');
  const msg = {
    'operation-attributes-tag': {
      'requesting-user-name': 'William',
      'job-name': 'My Test Job',
      'document-format': 'application/pdf'
    },
    data: pdf
  };
  printer.execute('Print-Job', msg, function(err, res) {
    console.log(res);
  });
});
```

To interact with a printer, create a `Printer` object.

> Technically speaking: a `Printer` object does not need to be an actual printer. According to the IPP spec, it
> could be any endpoint that accepts IPP messages. For example; the IPP object **could** be persistant media- like a
> CD ROM, hard drive, thumb drive, ...etc.

**options:**

* `charset` - Specifies the value for the 'attributes-charset' attribute of requests. Defaults to `utf-8`.
* `language` - Specifies the value for the 'attributes-natural-language' attribute of requests. Defaults to `en-us`.
* `uri` - Specifies the value for the 'printer-uri' attribute of requests. Defaults to `ipp://+url.host+url.path`.
* `version` - Specifies the value for the 'version' attribute of requests. Defaults to `2.0`.
* `agent` - Specifies the value for the 'http(s)' agent. Defaults to `undefined`.

### printer.execute(operation, message, callback)

Executes an IPP operation on the Printer object.

* 'operation' - There are many operations defined by IPP. See: [/lib/enums.js](https://github.com/williamkapke/ipp/blob/master/lib/enums.js#L52).
* 'message - A javascript object to be serialized into an IPP binary message.
  * Add binary data like file content as `data` property. `data` may either a buffer or a readable stream.
  * If response should be streamed instead of buffered and parsed (e.g. for response size reason) add a writeable stream as `output` property to message.
* 'callback(err, response)' - A function to callback with the Printer's response. Response is always `null` in case of an output stream.

### ipp.parse(buffer)

Parses a binary IPP message into a javascript object tree.

```javascript
const ipp = require('@sealsystems/ipp');
const data = new Buffer(
  '0200' + //version 2.0
  '000B' + //Get-Printer-Attributes
  '00000001' + //reqid
  '01' + //operation-attributes-tag
    //blah blah the required bloat of this protocol
    '470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650002656e' +
    '03', //end-of-attributes-tag
  'hex'
);

const result = ipp.parse(data);
console.log(JSON.stringify(result, null, 2));
//  ta-da!
//{
//  "version": "2.0",
//  "operation": 11,
//  "id": 1,
//  "operation-attributes-tag": {
//    "attributes-charset": "utf-8",
//    "attributes-natural-language": "en"
// }
//}
```

### ipp.serialize(msg)

Converts an IPP message object to IPP binary.

See [request](#request) for example.

<a id="request"></a>

### ipp.request(url, data, [writeableStream,] callback)

Makes an IPP request to a url.

If binary output should be streamed instead of read into a buffer object, call `request` with the optional `writeableStream` argument.

**Example 1: returning a response object**

```javascript
const ipp = require('@sealsystems/ipp');
const uri = 'your_printer';
const data = ipp.serialize({
  operation: 'Get-Printer-Attributes',
  'operation-attributes-tag': {
    'attributes-charset': 'utf-8',
    'attributes-natural-language': 'en',
    'printer-uri': uri
  }
});

ipp.request(uri, data, function(err, res) {
  if (err) {
    return console.log(err);
  }
  console.log(JSON.stringify(res, null, 2));
});
//  ta-da!.. hopefully you'll see a ton of stuff from your printer
```

**Example 2: writing into stream**

```javascript
const ipp = require('@sealsystems/ipp');
const uri = 'your_printer';
const jobId = 'your job id'
const data = ipp.serialize({
  operation: 'Fetch-Document',
  'operation-attributes-tag': {
    'attributes-charset': 'utf-8',
    'attributes-natural-language': 'en',
    'printer-uri': uri,
    'job-id': jobId
  }
});
const myWriteStream = ... // get stream from somewhere

ipp.request(uri, data, myWriteStream, function(err) {
  if (err) {
    return console.log(err);
  }
  // res is null, data is piped into myWriteStream
});
```

### Basic Auth

If you have to connect to an IPP printer or server that requires Basic Authentication you can add `auth` to the options.

```javascript
const ipp = require('@sealsystems/ipp');
const uri = 'your_printer';
const opts = parseurl(uri);
opts.auth = 'admin:secr3t';
ipp.request(opts, data, function(err, res) {
  if (err) {
    return console.log(err);
  }
  console.log(JSON.stringify(res, null, 2));
});
```

## License

MIT
