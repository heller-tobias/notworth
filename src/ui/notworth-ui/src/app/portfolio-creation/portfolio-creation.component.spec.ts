import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCreationComponent } from './portfolio-creation.component';

describe('PortfolioCreationComponent', () => {
  let component: PortfolioCreationComponent;
  let fixture: ComponentFixture<PortfolioCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortfolioCreationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
