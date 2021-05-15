import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjComponent } from './obj/obj.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ThreedComponent } from './threed/threed.component';
import { GltfComponent} from './gltf/gltf.component';
import {SolarComponent } from './solar/solar.component';
import { HeliComponent } from './heli/heli.component';
import {OsmComponent } from './osm/osm.component';
//import {OsmComponent } from './osm/osm.component';
const routes: Routes = [
  {
  path:'objfile'
,
component: ObjComponent
  },
  {
    path:'osm'
  ,
  component: OsmComponent
    },
  {
    path: 'gltf',
    component:GltfComponent
  },
  {
    path: 'threed',
    component:ThreedComponent
  },
   {
    path: 'solarpanel',
    component:SolarComponent
  },
  {
    path: 'heli',
    component:HeliComponent
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
