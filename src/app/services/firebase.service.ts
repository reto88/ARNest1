import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators, FormArray, FormBuilder} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient, private firebase: AngularFireDatabase, private  fb: FormBuilder) {
  }

  DimensionList: AngularFireList<any>;
  overviewList: AngularFireList<any>;
  item;
  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    liveObjects: new FormArray([])
  });

  loadNavItems() {
    return this.http.get('http://localhost:4200/assets/data.json');
    // return this.http.get('http://localhost:4200/assets/data.json')
    //    .subscribe(data => {
    //     console.log('reqt'+ data);
    //   });
  }

  getOverview() {
    this.overviewList = this.firebase.list('overview');
    return this.overviewList.snapshotChanges();
  }

  getObject(firebaseId: string) {
    this.item = this.firebase.object('overview/' + firebaseId).snapshotChanges().pipe(map(res => {
      return res.payload.val();
    }));
  }


  getDimension() {
    this.DimensionList = this.firebase.list('dimension');
    return this.DimensionList.snapshotChanges();
  }

  insertObject(object) {
    this.overviewList.push({
      fullName: object.fullName,
      Name: object.Name,
      email: object.email,
      mobile: object.mobile,
      liveObjects: object.liveObjects
      //  location: object.location
    });

    //  location: object.location

  }

  edit(detail) {
    this.form.setValue(detail);
  }

  udpateObject(detail) {
    this.overviewList.update(detail.$key,
      {
        fullName: detail.fullName,
        Name: detail.Name,
        email: detail.email,
        mobile: detail.mobile
      });
  }

  delete($key: string) {
    this.overviewList.remove($key);
  }

}
