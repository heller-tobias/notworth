import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueDistributionPieComponent } from './value-distribution-pie.component';

describe('ValueDistributionPieComponent', () => {
  let component: ValueDistributionPieComponent;
  let fixture: ComponentFixture<ValueDistributionPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueDistributionPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueDistributionPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
