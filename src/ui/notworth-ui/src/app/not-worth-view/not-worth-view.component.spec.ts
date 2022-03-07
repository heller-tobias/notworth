import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotWorthViewComponent } from './not-worth-view.component';

describe('NotWorthViewComponent', () => {
  let component: NotWorthViewComponent;
  let fixture: ComponentFixture<NotWorthViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotWorthViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotWorthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
