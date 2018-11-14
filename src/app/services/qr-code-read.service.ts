import {Injectable} from '@angular/core';
import jsQR from 'jsqr';

@Injectable({
  providedIn: 'root'
})
export class QrCodeReadService {

  constructor() {
  }

  getCanvas2d(imageData) {
    let oldid;
    let id;
    let storedid;
    let paragraph;
    // jsQR library
    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

    if (qrCode && qrCode.data !== '' && qrCode !== null) {

      paragraph = qrCode.data;
      const searchTerm = 'augmented/';

      const indexOfFirst = paragraph.indexOf(searchTerm);
      // id is everything after scan, scan is 5 length
      if (indexOfFirst !== 0) {
        storedid = paragraph.substr(indexOfFirst + searchTerm.length);
        id = storedid;

      } else {
        id = storedid;
       // console.log('else' + id);
      }

      return storedid;
    }
  }

}
