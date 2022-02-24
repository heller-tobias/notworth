import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from '../models/portfolio';

@Component({
  selector: 'app-all-portfolios-dashboard',
  templateUrl: './all-portfolios-dashboard.component.html',
  styleUrls: ['./all-portfolios-dashboard.component.scss']
})
export class AllPortfoliosDashboardComponent implements OnInit {
  @Input() portfolios?: Array<Portfolio>;
  
  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
