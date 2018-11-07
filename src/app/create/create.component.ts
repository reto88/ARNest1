import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {FormControl, FormArray, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(public firebaseservice: FirebaseService) {
  }

  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.firebaseservice.form.controls;
  isloaded: boolean;

  ngOnInit() {
    this.isloaded = true;
   let data= this.firebaseservice.getObject('-LQeqi6i8MV5Xvu6vmRa');
    setTimeout(function(){ console.log('singleobject'+data); }, 3000);
  }

  onSubmit() {
    JSON.parse( JSON.stringify(this.firebaseservice.form.value ) )
    this.submitted = true;
    if (this.firebaseservice.form.valid) {
      if (this.firebaseservice.form.get('$key').value == null) {
        this.firebaseservice.insertObject(this.firebaseservice.form.value);
        console.log('object ' + JSON.stringify(this.firebaseservice.form.value));
      }
      else {
        this.firebaseservice.udpateObject(this.firebaseservice.form.value);
      }
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.firebaseservice.form.reset();
    }
    console.log(this.formControls.name);
  }

  get liveObjectForms() {
    return this.firebaseservice.form.get('liveObjects') as FormArray;
  }

  addLiveObject() {

    const a = '12466';
    const liveobject = new FormGroup({
      numericId: new FormControl(a),
      test: new FormControl('asdasd')
    });
    (<FormArray> this.firebaseservice.form.controls['liveObjects']).push(liveobject);
  }
}
