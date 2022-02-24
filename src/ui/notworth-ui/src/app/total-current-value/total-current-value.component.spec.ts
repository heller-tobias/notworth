import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCurrentValueComponent } from './total-current-value.component';

describe('TotalCurrentValueComponent', () => {
  let component: TotalCurrentValueComponent;
  let fixture: ComponentFixture<TotalCurrentValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCurrentValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCurrentValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
