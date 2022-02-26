import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsOverviewComponent } from './positions-overview.component';

describe('PositionsOverviewComponent', () => {
  let component: PositionsOverviewComponent;
  let fixture: ComponentFixture<PositionsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
