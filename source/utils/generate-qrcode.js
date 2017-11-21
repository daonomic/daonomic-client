import QRCode from 'qrcode';

export default (raw) => (
  new Promise((resolve, reject) => {
    QRCode.toDataURL(raw, { errorCorrectionLevel: 'H' }, (err, code) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(code);
    });
  })
);
