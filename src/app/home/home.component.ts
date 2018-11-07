import {Component, OnInit, OnDestroy} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {RealtimeService} from '../services/realtime.service';

export interface InterfaceLivevalueObject {
  aks: string;
  numericId: string;
  timestamp: string;
  value: number;
  unit: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  load: any;
  getLive: any;
  isSub;

  constructor(private firebase: FirebaseService, private realtimeservice: RealtimeService) {
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
  }

  //  this.load = this.firebase.loadNavItems();

  ngOnDestroy() {
    if (this.isSub === true) {
      this.realtimeservice.unsubscribe();
      console.log('destroyed');
      this.isSub = false;
    }
  }
}
