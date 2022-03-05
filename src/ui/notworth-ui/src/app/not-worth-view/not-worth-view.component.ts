import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private portfolioService: PortfolioService, private messageService: MessageService, private route:Router) { }

  ngOnInit(): void {
    this.getPortfolios();
  }
 
  getPortfolios(): void{
    this.portfolioService.getPortfolios()
        .subscribe(portfolios => {this.portfolios = portfolios; this.checkRouting()});
  }

  private checkRouting(){
    if(this.portfolios){
      if(this.portfolios.length == 0){
        this.route.navigate(['/edit'])
      }
      if(this.portfolios.length == 1){
        this.route.navigate(['/view/portfolios/', this.portfolios[0].id])
      }
    }
  }
}
