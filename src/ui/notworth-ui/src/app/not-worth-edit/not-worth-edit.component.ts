import { Component, OnInit } from '@angular/core';
import { copy } from '../helper';
import { MessageService } from '../message.service';
import { DefaultPortfolio, Portfolio } from '../models/portfolio';
import { DefaultPosition, Position } from '../models/position';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-not-worth-edit',
  templateUrl: './not-worth-edit.component.html',
  styleUrls: ['./not-worth-edit.component.scss']
})
export class NotWorthEditComponent implements OnInit {
  
  portfolios: Portfolio[] = [];
  defaultPortfolio: Portfolio =  copy(DefaultPortfolio);
  selectedPortfolio: Portfolio = this.defaultPortfolio;

  defaultPosition: Position =  copy(DefaultPosition);
  selectedPosition: Position = this.defaultPosition;

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
  }

  positionSelected(): void{
    console.log(this.selectedPosition);
  }
}
