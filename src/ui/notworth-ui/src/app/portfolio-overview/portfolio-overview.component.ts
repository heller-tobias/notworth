import { ThisReceiver } from '@angular/compiler';
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
  allCategories: any = {};
  pieData?: Array<any>;
  lineData?: Array<any>;
  colors: Array<any>;
  
  historicalValueTitle: string = "Historical value in CHF";
  distributionValueTitle: string = "Wealth distribution";

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private messageService: MessageService
  ) {
    this.colors = this.getInitialColors();
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
        this.getLineData();
        this.getPieData();
        this.getUpdatedColors();
      });
    }
  }

  private getLineData(): void {
    this.lineData = [];
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

    this.lineData.push(totalValue);
  }

  private getPieData(): void {
    this.pieData = [];
    this.allCategories = {};
    if (this.portfolio?.positions) {
      for (const position of this.portfolio?.positions) {
        if(position.values.length >0){
          if(position.category in this.allCategories){
            this.allCategories[position.category] += position.values[0].value;
          }
          else{
            this.allCategories[position.category] = position.values[0].value;
          }
        }
      }
      for(const [category, value] of Object.entries(this.allCategories)){
        this.pieData.push({
          name: category,
          value: value,
        });
      }
    }
  }

  private getInitialColors() {
    return [
      { name: 'Total Value', value: '#457B9D' }
    ];
  }

  private getUpdatedColors(){
    this.colors = this.getInitialColors();
    const allColors = ['#1D3557', '#457B9D', '#A8DADC', '#E63946', '#F1FAEE'];
    let counter = 0;
    if(this.portfolio?.positions){
      for(const category of Object.keys(this.allCategories)){
        this.colors.push({name: category, value: allColors[counter%allColors.length]});
        counter ++;
      }
    }
  }
}
