import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  classroomForm: FormGroup;
  students: FormArray;
  getId;
  firebaseId: string;
  hasStudents: boolean = false;
  submitted: boolean = false;
  objectListArray;
  constructor(private formBuilder: FormBuilder, private firebaseService: FirebaseService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.classroomForm = this.formBuilder.group({
      '$key': [null],
      'class_name': [null, Validators.required],
      'students': this.formBuilder.array([])
    });
    this.route.paramMap.subscribe(paramMap => {
      this.firebaseService.getObjectList().subscribe(
        data => {
          this.objectListArray = data.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };

          });
          console.log(this.objectListArray);
        });


      this.firebaseId = paramMap.get('firebaseId');
      console.log('ID' + this.firebaseId);
      this.firebaseService.getObjectbyId(this.firebaseId).subscribe((data) => {

        let controlArray = <FormArray>this.classroomForm.controls['students'];
        if (controlArray.length > 0) {
          this.hasStudents = true;
          data.students.forEach(std => {
            controlArray.push(this.formBuilder.group({
              student_name: ''
            }));
          });
          for (let i = 0; i < data.students.length; i++) {
            controlArray.controls[i].get('student_name').setValue(data.students[i].student_name);
          }
        }
        console.log(this.classroomForm);
        console.log('data' + JSON.stringify(data));

      });

    });

  }
  createStudent(): FormGroup {
    return this.formBuilder.group({
      student_name: new FormControl('', Validators.required)
    });
  }
  //https://www.djamware.com/post/5b5cffaf80aca707dd4f65aa/building-crud-mobile-app-using-ionic-4-angular-6-and-cordova
  addBlankStudent(): void {

    this.hasStudents = true;
    this.students = this.classroomForm.get('students') as FormArray;
    this.students.push(this.createStudent());
    console.log('stud ' + this.students);
  }

  deleteStudent(control, index) {
    console.log('cont' + control + 'inde' + index);
    control.splice(index, 1)
  }

  editObject(object) {
    const arr = <FormArray>this.classroomForm.controls.students;
    arr.controls = []; //clear array
    console.log('edit' + object);
    for (let i = 0; i < object.students.length; i++) {
      this.addBlankStudent();
    }

    this.classroomForm.setValue(object);

  }
  deleteObject(object) {
    this.firebaseService.deleteObject(object.$key);
  }
  onSubmit() {
    this.submitted = true;
    if (this.classroomForm.get('$key').value == null) {

      this.firebaseService.postObject(this.classroomForm.value);

    }
    else {
      this.firebaseService.putObject(this.classroomForm.value);
    }

    console.log('form' + JSON.stringify(this.classroomForm.value));

  }
}
