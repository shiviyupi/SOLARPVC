import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreemakegeomteryComponent } from './threemakegeomtery.component';

describe('ThreemakegeomteryComponent', () => {
  let component: ThreemakegeomteryComponent;
  let fixture: ComponentFixture<ThreemakegeomteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreemakegeomteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreemakegeomteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
