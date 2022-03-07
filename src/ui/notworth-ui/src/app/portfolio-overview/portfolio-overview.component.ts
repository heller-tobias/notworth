import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { Portfolio } from '../models/portfolio';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio-overview',
  templateUrl: './portfolio-overview.component.html',
  styleUrls: ['./portfolio-overview.component.scss'],
})
export class PortfolioOverviewComponent implements OnInit {
  @Input() portfolio?: Portfolio;
  chartData?: Array<any>;
  colors: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private messageService: MessageService
  ) {
    this.colors = this.getColors();
  }

  ngOnInit(): void {
    this.getPortfolio();
  }

  getPortfolio(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!id && this.portfolio) {
      id = this.portfolio?.id;
    }
    if (id) {
      this.portfolioService.getPortfolio(id).subscribe((portfolio) => {
        this.portfolio = portfolio;
        this.getChartData();
      });
    }
  }

  private getChartData(): void {
    this.chartData = [];
    let totalValue: any = { name: 'Total Value' };
    const totalValueSeries = [];
    if (this.portfolio?.historicTotalValue) {
      for (const historicValue of this.portfolio?.historicTotalValue) {
        totalValueSeries.push({
          name: new Date(historicValue.date),
          value: historicValue.totalValue,
        });
      }
      totalValue.series = totalValueSeries.reverse();
    }

    this.chartData.push(totalValue);
  }

  private getColors() {
    return [
      { name: 'Total Value', value: '#457B9D' },
      { name: 'b', value: '#ff0000' },
    ];
  }
}
