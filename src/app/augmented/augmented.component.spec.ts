import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AugmentedComponent } from './augmented.component';

describe('AugmentedComponent', () => {
  let component: AugmentedComponent;
  let fixture: ComponentFixture<AugmentedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AugmentedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AugmentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
