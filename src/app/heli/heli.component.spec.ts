import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeliComponent } from './heli.component';

describe('HeliComponent', () => {
  let component: HeliComponent;
  let fixture: ComponentFixture<HeliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
