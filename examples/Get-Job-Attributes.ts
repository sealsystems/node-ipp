
import ipp from './../ipp';

const printer = ipp.Printer('http://cp02.local.:631/ipp/printer');
const msg = {
  'operation-attributes-tag': {
    'job-uri': 'ipp://CP01.local/ipp/printer/0186'
  }
};
function go() {
  // eslint-disable-next-line handle-callback-err
  printer.execute('Get-Job-Attributes', msg, (err: any, res: any) => {
    console.log(res);
    setTimeout(go, 0);
  });
}
go();
