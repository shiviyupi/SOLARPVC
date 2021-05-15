import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjComponent } from './obj/obj.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { ThreedComponent } from './threed/threed.component';
import { GltfComponent } from './gltf/gltf.component';
import { ThreemakegeomteryComponent } from './threemakegeomtery/threemakegeomtery.component';
import { SolarComponent } from './solar/solar.component';
import { HeliComponent } from './heli/heli.component';
import { OsmComponent } from './osm/osm.component';
import { ShpComponent } from './shp/shp.component';
@NgModule({
  declarations: [
    AppComponent,
    ObjComponent,
    SpinnerComponent,
    ThreedComponent,
    GltfComponent,
    ThreemakegeomteryComponent,
    SolarComponent,
    HeliComponent,
    OsmComponent,
    ShpComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
