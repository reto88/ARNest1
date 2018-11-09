import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient, private firebase: AngularFireDatabase, private fb: FormBuilder) {
  }
  
  surveys2: AngularFireList<any>;
  DimensionList: AngularFireList<any>;
  overviewList: AngularFireList<any>;
  singleObject: AngularFireObject<any>;
  arrayWathlist;
  item: Observable<any>;
  form = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    created: new FormControl(''),
    liveObjects: new FormArray([], Validators.required)
  });
 
 /* liveObjects: new FormArray([new FormGroup({
    numericId: new FormControl(''),
    aks: new FormControl('')
  })])
   liveObjects: new FormArray([new FormGroup({
      numericId: new FormControl(),
      aks: new FormControl(),
      unit: new FormControl(),
      description: new FormControl(),
      timestamp: new FormControl(),
      value: new FormControl()
    })])
  liveObjects: new FormArray([], Validators.required)*/
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

 
  getObject2(firebaseId: string): Observable<any> {
    return this.item = this.firebase.object('overview/' + firebaseId).valueChanges();
  }


  getDimension() {
    this.DimensionList = this.firebase.list('dimension');
    return this.DimensionList.snapshotChanges();
  }

  insertObject(object) {
    let datetime=new Date();
    console.log('date'+datetime);
    this.overviewList.push({
      name: object.name,
      description: object.description,
      email: object.email,
      created: datetime.toString() ,
      liveObjects: object.liveObjects
      //  location: object.location
    });

    //  location: object.location

  }

  edit(detail) {
    console.log('detail'+JSON.stringify(detail.liveObjects.length));
    detail.liveObjects.push(this.form.controls.liveObjects[0]);
    if(this.form.controls['liveObjects']){
      this.form.patchValue({
          $key:detail.$key,
        name: detail.name,
        description: detail.description,
        email:detail.name,
        created:detail.created,
        liveObjects: detail.liveObjects
        });
        console.log('as'+this.form.controls['liveObjects']);
    }
   console.log('detail'+JSON.stringify(detail.liveObjects));
  }

  qr(detail) {
    this.form.patchValue(detail);
  
  }
  udpateObject(detail) {
    this.overviewList.update(detail.$key,
      {
        name: detail.name,
        description: detail.description,
        email: detail.email,
        created: detail.created,
        liveObjects: detail.liveObjects
      });
  }

  delete($key: string) {
    this.overviewList.remove($key);
  }

}
