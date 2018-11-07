import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(public firebaseservice: FirebaseService) {
  }

  overviewArray = [];
  showDeleteMessage: boolean;
  searchText: string = '';

  ngOnInit() {
    console.log('overview');
    this.firebaseservice.getOverview().subscribe(
      data => {
        this.overviewArray = data.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };

        });
        console.log(this.overviewArray);
      });
  }

  onDelete($key) {
    if (confirm('are you sure to delete?')) {
      this.firebaseservice.delete($key);
      this.showDeleteMessage = true;
      setTimeout(() => this.showDeleteMessage = false, 3000);
    }
  }

  filterCondition(detail) {
    if (detail.mobile.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1) {
      return detail.mobile.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
    } else if (detail.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1) {
      return detail.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
    } else if (detail.email.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1) {
      return detail.email.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
    }
  }

}
