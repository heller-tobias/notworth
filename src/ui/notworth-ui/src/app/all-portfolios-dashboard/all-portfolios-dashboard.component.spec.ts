import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllPortfoliosDashboardComponent } from './all-portfolios-dashboard.component';

describe('AllPortfoliosDashboardComponent', () => {
  let component: AllPortfoliosDashboardComponent;
  let fixture: ComponentFixture<AllPortfoliosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllPortfoliosDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPortfoliosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
