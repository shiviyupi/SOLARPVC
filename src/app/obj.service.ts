import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjService {

  loadPercentage: Subject<number> = new Subject();

  constructor() { }
}
