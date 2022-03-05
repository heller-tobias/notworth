import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueLineGraphComponent } from './value-line-graph.component';

describe('ValueLineGraphComponent', () => {
  let component: ValueLineGraphComponent;
  let fixture: ComponentFixture<ValueLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueLineGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
