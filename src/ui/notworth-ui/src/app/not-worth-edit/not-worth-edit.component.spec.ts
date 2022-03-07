import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotWorthEditComponent } from './not-worth-edit.component';

describe('NotWorthEditComponent', () => {
  let component: NotWorthEditComponent;
  let fixture: ComponentFixture<NotWorthEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotWorthEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotWorthEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
