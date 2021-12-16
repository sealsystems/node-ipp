
import ipp from './../ipp';

const printer = ipp.Printer('http://cp02.local.:631/ipp/printer');
const msg = {
  'operation-attributes-tag': {
    'requesting-user-name': 'William',
    message: 'These are not the droids you are looking for'
  }
};
// eslint-disable-next-line handle-callback-err
printer.execute('Identify-Printer', msg, (err: any, res: any) => {
  console.log(res);
});
