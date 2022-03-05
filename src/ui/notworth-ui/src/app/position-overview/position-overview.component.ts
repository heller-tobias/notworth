import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { CurrentTotalValue } from '../models/current-total-value';
import { Position } from '../models/position';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-position-overview',
  templateUrl: './position-overview.component.html',
  styleUrls: ['./position-overview.component.scss']
})
export class PositionOverviewComponent implements OnInit {

  @Input() position?: Position;
  currentTotalValue?: CurrentTotalValue;
  currency: string = "CHF";
  chartData?: Array<any>;
  colors?: Array<any>;

  constructor(private route: ActivatedRoute, private portfolioService: PortfolioService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPosition();

  }

  getPosition(): void {
    const id = this.route.snapshot.paramMap.get('id')
    const portfolioId = this.route.snapshot.paramMap.get('portfolioId')

    if (id && portfolioId) {
      this.portfolioService.getPosition(portfolioId, id)
        .subscribe(position => { this.position = position; this.getCurrentValue(); this.getChartData(); this.getColors()});
    }
  }

  getCurrentValue() {
    if (this.position) {
      const value: CurrentTotalValue = { minDate: new Date(), maxDate: new Date(), value: 0 };

      if (this.position?.values.length > 0) {
        value.value = this.position?.values[0].value;
        value.maxDate = this.position?.values[0].date;
        value.minDate = this.position?.values[0].date;
      }
      this.currentTotalValue = value;
    }
  }


private getChartData(): void {
  this.chartData = [];
  if(this.position){
    let totalValue: any = { "name": this.position.name };
    const totalValueSeries = [];
    if(this.position?.values){
    for (const value of this.position?.values) {
      totalValueSeries.push({ "name": new Date(value.date), "value": value.value })
    }
    totalValue.series = totalValueSeries.reverse();
  }
  this.chartData.push(totalValue);
  }
}

private getColors(){
  if(this.position){
    this.colors = [
      { "name": this.position.name, "value": "#457B9D" }
    ]
  }
 
}

}
