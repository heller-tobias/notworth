import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Portfolio } from '../models/portfolio';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio-creation',
  templateUrl: './portfolio-creation.component.html',
  styleUrls: ['./portfolio-creation.component.scss']
})
export class PortfolioCreationComponent implements OnInit {

  @Input() portfolio: Portfolio;
  
  constructor(private portfolioService: PortfolioService, private messageService: MessageService) { 
    this.portfolio = {id: "", name:"", description:"", currentTotalValue: {value: 0, minDate:new Date(), maxDate:new Date()}, positions: []};
  }
 
  ngOnInit(): void {
  }

  createPortfolio(){
    console.log(this.portfolio);
    this.portfolioService.createPortfolio(this.portfolio).subscribe(portfolioId => console.log(portfolioId));
  }

}
