import { ObjService } from './obj.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'objproject';
  isload = false;
  loadObject: boolean = false
  show;
  loadPercentageSub: Subscription;
  loadPercentage: number;
  constructor(
    private objService: ObjService
  ) {

  }

  ngOnInit() {
    this.loadPercentageSub = this.objService.loadPercentage.subscribe(val => {
      this.loadPercentage = val;
      console.log(this.loadPercentage);
    });
  }

  new() {
    this.isload = true;
    setTimeout(() => {
      this.isload = false;
      this.loadObject = true;
    }, 2000);
  }
}
