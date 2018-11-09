import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AugmentedComponent} from './augmented/augmented.component';
import {HomeComponent} from './home/home.component';
import {CreateComponent} from './create/create.component';
import {DimensionComponent} from './dimension/dimension.component';
import { QrComponent } from './qr/qr.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'augmented/:firebaseId', component: AugmentedComponent },
  {path: 'augmented', component: AugmentedComponent },
  {path: 'home', component: HomeComponent },
  {path: 'create', component: CreateComponent },
  {path: 'dimension', component: DimensionComponent },
  {path: 'qr', component: QrComponent},
  {path: 'qr/:firebaseId', component: QrComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
