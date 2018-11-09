import { Component, OnInit,Input } from '@angular/core';
import {environment} from  '../../environments/environment';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {
  @Input() qrKey: string;
  myQrCode:string;
  sub;
  id;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    
    console.log('myqrcode'+ this.myQrCode);
    
    this.id = this.route.snapshot.paramMap.get('firebaseId');
 
    this.myQrCode = environment.baseUrl + this.id;
  
  }
  // print code
  printfunction() {
    window.print();
  }

}
