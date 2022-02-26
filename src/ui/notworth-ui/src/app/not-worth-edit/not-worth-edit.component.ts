import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { copyPortfolio, DefaultPortfolio, Portfolio } from '../models/portfolio';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-not-worth-edit',
  templateUrl: './not-worth-edit.component.html',
  styleUrls: ['./not-worth-edit.component.scss']
})
export class NotWorthEditComponent implements OnInit {
  
  portfolios: Portfolio[] = [];
  defaultPortfolio: Portfolio =  copyPortfolio(DefaultPortfolio);
  selectedPortfolio: Portfolio = copyPortfolio(this.defaultPortfolio);

  constructor(private portfolioService: PortfolioService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPortfolios();
  }
 
  getPortfolios(): void{
    this.portfolioService.getPortfolios()
        .subscribe(portfolios => this.portfolios = portfolios);
  }
  
  portfolioSelected(): void{
    console.log(this.selectedPortfolio);
    console.log(this.defaultPortfolio);
  }

}
