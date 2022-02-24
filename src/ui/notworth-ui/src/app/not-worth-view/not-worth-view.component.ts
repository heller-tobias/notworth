import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Portfolio } from '../models/portfolio';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-not-worth-view',
  templateUrl: './not-worth-view.component.html',
  styleUrls: ['./not-worth-view.component.scss']
})
export class NotWorthViewComponent implements OnInit {

  portfolios: Portfolio[] = [];

  constructor(private portfolioService: PortfolioService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPortfolios();
  }
 
  getPortfolios(): void{
    this.portfolioService.getPortfolios()
        .subscribe(portfolios => this.portfolios = portfolios);
  }
}
