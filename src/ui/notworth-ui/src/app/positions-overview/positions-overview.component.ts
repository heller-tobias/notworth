import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { Position } from '../models/position';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-positions-overview',
  templateUrl: './positions-overview.component.html',
  styleUrls: ['./positions-overview.component.scss'],
})
export class PositionsOverviewComponent implements OnInit {
  @Input() positions?: Array<Position>;
  currency: string = 'CHF';

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPortfolio();
  }

  getPortfolio(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.portfolioService
        .getPortfolio(id)
        .subscribe((portfolio) => (this.positions = portfolio.positions));
    }
  }

  getLastUpdate(positionId: string): string | undefined {
    const currentPosition: any = this.getPositionWithId(positionId);
    if (currentPosition && currentPosition.values?.length > 0) {
      return currentPosition.values[0].date?.toString();
    }
    return new Date().toISOString();
  }

  getCurrentValue(positionId: string): number {
    const currentPosition: any = this.getPositionWithId(positionId);
    if (currentPosition && currentPosition.values?.length > 0) {
      return currentPosition.values[0].value;
    }
    return 0;
  }

  getPositionWithId(positionId: string): Position | undefined {
    return this.positions?.find((position) => position.id == positionId);
  }
}
