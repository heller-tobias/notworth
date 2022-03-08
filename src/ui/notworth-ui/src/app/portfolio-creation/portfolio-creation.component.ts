import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PortfolioCreatedEvent } from '../events/portfolio-created-event';
import { MessageService } from '../message.service';
import { DefaultPortfolio, Portfolio } from '../models/portfolio';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio-creation',
  templateUrl: './portfolio-creation.component.html',
  styleUrls: ['./portfolio-creation.component.scss'],
})
export class PortfolioCreationComponent implements OnInit {
  @Input() portfolio: Portfolio;
  @Output() created = new EventEmitter<PortfolioCreatedEvent>();

  constructor(
    private portfolioService: PortfolioService,
    private messageService: MessageService
  ) {
    this.portfolio = DefaultPortfolio;
  }

  ngOnInit(): void {}

  createPortfolio() {
    this.portfolioService
      .createPortfolio(this.portfolio)
      .subscribe((portfolioId) => {
        this.created.emit({ portfolioId: portfolioId });
      });
  }
}
