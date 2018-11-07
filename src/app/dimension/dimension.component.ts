import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {LiveObjects} from '../services/object.interface';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.scss']
})
export class DimensionComponent implements OnInit {
  searchText: string = '';
  selectedDimension: Array<LiveObjects> = [];
  liveObject: LiveObjects;

  constructor(public firebaseservice: FirebaseService) {
  }

  DimensionArray = [];


  ngOnInit() {
    this.firebaseservice.getDimension().subscribe(
      data => {
        this.DimensionArray = data.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };

        });
        console.log(this.DimensionArray);
      });
  }

  filterCondition(dimension) {
    if (dimension.AKS_Code.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1) {
      return dimension.AKS_Code.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
    } else if (dimension.Prodcut_Type.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1) {
      return dimension.Prodcut_Type.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
    }
  }

  rowSelected(dimension: any) {
    this.liveObject = {
      aks: dimension.AKS_Code,
      _numericId: dimension._NUMERICID,
      description: dimension.Datapoint_SignalDescription,
      unit: dimension.Datapoint_Unit
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
      this.selectedDimension.splice(index, 1);
    }
    //  allSelected.push(this.selectedDimension.$key);

    // allSelected.push(this.selectedDimension);
    console.log('selected' + JSON.stringify(this.selectedDimension.length));
  }

  addToForm() {
    for (let i = 0; i < this.selectedDimension.length; i++) {
      const liveobject = new FormGroup({
        numericId: new FormControl(this.selectedDimension[i]._numericId),
        aks: new FormControl(this.selectedDimension[i].aks)
      });
      (<FormArray> this.firebaseservice.form.controls['liveObjects']).push(liveobject);
    }
  }
}
