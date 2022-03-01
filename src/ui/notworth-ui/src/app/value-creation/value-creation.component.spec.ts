import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCreationComponent } from './value-creation.component';

describe('ValueCreationComponent', () => {
  let component: ValueCreationComponent;
  let fixture: ComponentFixture<ValueCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
