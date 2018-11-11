import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {QrCodeReadService} from '../services/qr-code-read.service';
import jsQR from 'jsqr';
import {FirebaseService} from '../services/firebase.service';
import {RealtimeService} from '../services/realtime.service';
import {ActivatedRoute} from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-augmented',
  templateUrl: './augmented.component.html',
  styleUrls: ['./augmented.component.scss']
})
export class AugmentedComponent implements OnInit, OnDestroy {
  test = 15;
  test1 = 16;
  actualQRCode;
  isSub;
  load;
  load2;
  isloading = false;
  qrCodeOld: string;
  id;
  picture;
  down;
  sub1;

  constructor(private qrCodeRead: QrCodeReadService, private firebase: FirebaseService, private realtimeservice: RealtimeService, private route: ActivatedRoute) {
  }

  scanStart(event) {
    this.down = true;
    console.log(event);
  }
  scanStop(event) {
    this.down = false;
    console.log(event);
  }
  ngOnInit() {
    this.isSub = false;
    this.sub1 = false;
    this.route.paramMap.subscribe(paramMap => {

      this.id = paramMap.get('firebaseId');
      console.log('id!' + this.id);
      this.actualQRCode = this.id;

      if (this.id !== null) {
        console.log('id!' + this.id);
        this.firebase.getObject2(this.id).subscribe((data) => {
          this.picture = data.picture;
          this.load = data['liveObjects'];

          console.log(JSON.stringify(this.load) + 'length' + this.load.length + 'pic' + this.picture);
          if (this.load.length >= 1) {
            this.isloading = true;
            this.realtimeservice.getData(this.load).subscribe(
              data2 => {
                // important to close subscription on destroy
                this.isSub = true;
                this.sub1 = true;
                this.load = data2;
                //      console.log('isloadedasasasa????????' + this.load + ' ' + this.isloading);
              });
          }
          else {
            console.log('noID');
          }
        });

      }

    });

    this.augmented();

  }


  /*  this.firebase.getObject2('-LQnZKErPRyWBch5Ltpb').subscribe((data) => {
      //  this.isloading = true;
      this.load2 = data;
      let livevalueobject = this.load2['liveObjects'];
      console.log('firebaseload!!!!as!!!!!' + JSON.stringify(this.load2['liveObjects']));
      this.realtimeservice.getData(livevalueobject).subscribe(
        data2 => {
          this.load = data2;

          // important to close subscription on destroy
          this.isSub = true;
          this.load = data2;

        }
      );
    }); */

  /*  this.firebase.getObject2('-LQnZKErPRyWBch5Ltpb')
      // clone the data object, using its known Config shape
      .subscribe((data) => {
        this.load = data['liveObjects'];
        this.isloading = true;
        console.log(JSON.stringify(this.load)+'length'+this.load.length);
        if (this.load.length>=1){
          this.realtimeservice.getData(this.load).subscribe(
            data2 => {
              // important to close subscription on destroy
              this.isSub = true;
              this.load = data2;
              console.log('isloadedasasasa????????' + this.load + ' ' + this.isloading)
            } );
        }
      }); */
  /*   this.realtimeservice.getData(this.load).subscribe(
       data2 => {
         // important to close subscription on destroy
         this.isSub = true;
         this.load = data2;
         console.log('isloadedasasasa????????' + this.load + ' ' + this.isloading)
       }
     ); */


  // make a reload to close webcam
  goHomeAndReload() {
    window.location.href = '../home';
  }

  augmented() {

    const canvasElement = document.createElement('canvas');


    setInterval(function () {
      //  console.log(that.down);

      let canvasContext = canvasElement.getContext('2d');
      const video = document.querySelector('video');
      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
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
        if (that.down === true) {
         // console.log('isSUB'+that.down);
          that.isloading = false;
          if (that.sub1 === true) {
            that.realtimeservice.unsubscribe();
            setTimeout(function () {
              //     console.log('timeout');
            }, 2000);
            //    console.log('isSUB');
            that.sub1 = false;

          }
          const qrCode = that.qrCodeRead.getCanvas2d(imageData);
          if (qrCode !== undefined) {
            that.actualQRCode = qrCode;
            //  console.log('QR' + that.actualQRCode);
            if (that.actualQRCode === that.qrCodeOld) {
              //qrCodeOld = that.actualQRCode;
              //   console.log('gleich' + that.qrCodeOld + 'actuael' + that.actualQRCode);
             // that.isloading = true;
            } else if (that.actualQRCode !== that.qrCodeOld) {
              that.isSub = true;
              that.sub1 = true;
              that.down = false;
              //    console.log('asdasdasdas');
              // console.log('ungleich OLD' + that.qrCodeOld + 'actuael' + that.actualQRCode);
              that.firebase.getObject2(that.actualQRCode).subscribe((data) => {
                that.picture = data.picture;
                that.load = data['liveObjects'];

                console.log(JSON.stringify(data) + 'daata');
                if (that.load.length >= 1) {
                  //  that.realtimeservice.unsubscribe();
                  that.isloading = true;
                  that.realtimeservice.getData(that.load).subscribe(
                    data2 => {
                      // important to close subscription on destroy
                      that.isSub = true;
                      that.load = data2;
                      that.isloading = true;
                      //  console.log('isloadedasasasa????????' + that.load + ' ' + that.isloading);
                    });
                  that.isloading = true;
                }
                else {
                  //    console.log('noID');
                }
              });
              that.qrCodeOld = that.actualQRCode;
              that.isloading = true;

            }
          }
        }

      }
    }, 50);

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
    if (this.isSub === true || this.sub1) {
      this.realtimeservice.unsubscribe();
      console.log('destroyed');
      this.isSub = false;
      this.sub1 = false;
    }
  }
}
