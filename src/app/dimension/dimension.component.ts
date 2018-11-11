import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {LiveObjects} from '../services/object.interface';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Router} from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.scss']
})
export class DimensionComponent implements OnInit {
  searchText: string = '';
  selectedDimension: Array<LiveObjects> = [];
  liveObject: LiveObjects;

  constructor(public firebaseservice: FirebaseService, private router: Router) {
  }

  DimensionArray = [];


  ngOnInit() {
    this.selectedDimension = [];
    if (this.firebaseservice.form.value['liveObjects'].length >= 1) {
      this.selectedDimension = this.firebaseservice.form.value['liveObjects'];
    }
  //  console.log('wdwdwd' + JSON.stringify(this.firebaseservice.form.value['liveObjects']));
    this.firebaseservice.getDimension().subscribe(
      data => {
        this.DimensionArray = data.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };

        });
      //  console.log(this.DimensionArray);
      });
  }

  filterCondition(dimension) {
    if (dimension.AKS_Code.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1) {
      return dimension.AKS_Code.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
    } else if (dimension.Prodcut_Type.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1) {
      return dimension.Prodcut_Type.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
    } else if (dimension.Datapoint_SignalDescription.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1) {
      return dimension.Prodcut_Type.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
    }
  }

  rowSelected(dimension: any) {
    this.liveObject = {
      aks: dimension.AKS_Code,
      numericId: dimension._NUMERICID.toString(),
      description: dimension.Datapoint_SignalDescription,
      unit: dimension.Datapoint_Unit,
      value: -999,
      timestamp: '-666'
    };
    //let allSelected = new Array();
    //  allSelected.push(this.selectedDimension.$key);

    // this.liveObject._numericId = dimension._NUMERICID;
    //  this.liveObject.description = dimension.Datapoint_SignalDescription;
    //  this.liveObject.unit = dimension.Datapoint_Unit;
    this.selectedDimension.push(this.liveObject);   // declare variable in component.
    // allSelected.push(this.selectedDimension);
    console.log('selected' + JSON.stringify(this.selectedDimension));
  }

  rowDisSelected(select: any) {
    const index = this.selectedDimension.indexOf(select);
    if (index > -1) {
      this.selectedDimension.splice(index, 1); //entfernt, index
    }
    //  allSelected.push(this.selectedDimension.$key);

    console.log('disselect' + this.selectedDimension+ JSON.stringify(this.firebaseservice.form.controls['liveObjects']+'wer'));

  }

  addToForm() {
    let liveobject;
    const arr = <FormArray>this.firebaseservice.form.controls.liveObjects;
    arr.controls = [];
    if (this.selectedDimension.length >= 0) {
      for (let i = 0; i < this.selectedDimension.length; i++) {
        liveobject = new FormGroup({
          numericId: new FormControl(this.selectedDimension[i].numericId),
          aks: new FormControl(this.selectedDimension[i].aks),
          unit: new FormControl(this.selectedDimension[i].unit),
          description: new FormControl(this.selectedDimension[i].description),
          value: new FormControl(this.selectedDimension[i].value),
          timestamp: new FormControl(this.selectedDimension[i].timestamp),
        });
        (<FormArray> this.firebaseservice.form.controls['liveObjects']).push(liveobject);
      }
    }
    console.log('selected' + JSON.stringify(this.selectedDimension) + JSON.stringify(this.selectedDimension[0]));
    this.router.navigate(['/create']);


  }
}
