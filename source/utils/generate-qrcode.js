import QRCode from 'qrcode';

export default function generateQrCode(rawData) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(rawData, { errorCorrectionLevel: 'H' }, (error, generatedQrCode) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(generatedQrCode);
    });
  });
}
