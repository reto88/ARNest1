import {Component, OnInit, OnDestroy} from '@angular/core';
import {QrCodeReadService} from '../services/qr-code-read.service';
import jsQR from 'jsqr';
import {FirebaseService} from '../services/firebase.service';
import {RealtimeService} from '../services/realtime.service';

@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})
export class AugmentedComponent implements OnInit, OnDestroy {
  test = 15;
  test1 = 16;
  actualQRCode = '-';
  isSub;
  load;
  isloading = false;
  qrCodeOld: string;

  constructor(private qrCodeRead: QrCodeReadService, private firebase: FirebaseService, private realtimeservice: RealtimeService) {
  }

  ngOnInit() {
    this.firebase.loadNavItems()
    // clone the data object, using its known Config shape
      .subscribe((data) => {
        this.load = data;
        console.log(JSON.stringify(this.load));
        this.realtimeservice.getData(this.load).subscribe(
          data2 => {
            // important to close subscription on destroy
            this.isSub = true;
            this.load = data2;
          }
        );
      });

    this.augmented();
  }

  // make a reload to close webcam
  goHomeAndReload() {
    window.location.href = '../home';
  }

  augmented() {

    const canvasElement = document.createElement('canvas');
    setTimeout(function () {
      setInterval(function () {
        let canvasContext = canvasElement.getContext('2d');
        const video = document.querySelector('video');
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvasContext.drawImage(
          video,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        let imageData = canvasContext.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        const qrCode = that.qrCodeRead.getCanvas2d(imageData);
        if (qrCode !== undefined) {
          that.actualQRCode = qrCode;

          if (that.actualQRCode === this.qrCodeOld) {
            //qrCodeOld = that.actualQRCode;
            console.log('gleich OLD' + this.qrCodeOld + 'actuael' + that.actualQRCode);
            that.isloading = true;
          } else if (that.actualQRCode !== this.qrCodeOld) {
            this.qrCodeOld = that.actualQRCode;
            that.isloading = false;
            console.log('ungleich' + this.qrCodeOld + this.isloading);
          }
        }

      }, 500);
    }, 2000);
    // to use Qr Service in requestAnimatation()
    const that = this;
    // updated 60 fps
    requestAnimationFrame(function animate(nowMsec) {
      setTimeout(function () {



        /*    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
            if (qrCode && qrCode.data !== '') {
              that.actualQRCode = qrCode.data;
              console.log('QR Code Data - ' + that.actualQRCode);
            } else {
              console.log('no qr code found');
            } */
        // console.log(qrCode + '__' + canvasContext);

      }, 2000);
      //  console.log('no qr code found'+    that.actualQRCode);

      // const actualQRCode2 = that.qrCodeRead.getCanvas2d(canvasContext);

      requestAnimationFrame(animate);
    });


  }

  ngOnDestroy() {
    if (this.isSub === true) {
      this.realtimeservice.unsubscribe();
      console.log('destroyed');
      this.isSub = false;
    }
  }
}
