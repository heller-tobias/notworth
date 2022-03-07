import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionOverviewComponent } from './position-overview.component';

describe('PositionOverviewComponent', () => {
  let component: PositionOverviewComponent;
  let fixture: ComponentFixture<PositionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
