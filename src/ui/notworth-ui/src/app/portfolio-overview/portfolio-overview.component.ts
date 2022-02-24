import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { Portfolio } from '../models/portfolio';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio-overview',
  templateUrl: './portfolio-overview.component.html',
  styleUrls: ['./portfolio-overview.component.scss']
})
export class PortfolioOverviewComponent implements OnInit {

  @Input() portfolio?: Portfolio;
  constructor(private route: ActivatedRoute, private portfolioService: PortfolioService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPortfolio();
  }

  getPortfolio(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.portfolioService.getPortfolio(id)
        .subscribe(portfolio => this.portfolio = portfolio);
    }
  }
}
