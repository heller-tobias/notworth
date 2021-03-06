import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { PortfolioCreatedEvent } from '../events/portfolio-created-event';
import { PositionCreatedEvent } from '../events/position-created-event';
import { ValueCreatedEvent } from '../events/value-created-event';
import { copy } from '../helper';
import { MessageService } from '../message.service';
import { DefaultPortfolio, Portfolio } from '../models/portfolio';
import { DefaultPosition, Position } from '../models/position';
import { DefaultValue, Value } from '../models/value';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-not-worth-edit',
  templateUrl: './not-worth-edit.component.html',
  styleUrls: ['./not-worth-edit.component.scss'],
})
export class NotWorthEditComponent implements OnInit {
  portfolios: Portfolio[] = [];

  defaultPortfolio: Portfolio = copy(DefaultPortfolio);
  selectedPortfolio: Portfolio = this.defaultPortfolio;
  portfolioToSelectId: string = this.defaultPortfolio.id;

  defaultPosition: Position = copy(DefaultPosition);
  selectedPosition: Position = this.defaultPosition;
  positionToSelectId: string = this.defaultPortfolio.id;

  defaultValue: Value = copy(DefaultValue);
  selectedValue: Value = this.defaultValue;
  valueToSelectId: string = this.defaultValue.id;

  constructor(
    private portfolioService: PortfolioService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPortfolios();
  }

  getPortfolios(): void {
    //TODO: Set selected again
    this.portfolioService.getPortfolios().subscribe((portfolios) => {
      this.portfolios = portfolios;
      this.selectPortfolio();
      this.selectPosition();
      this.selectValue();
    });
  }

  portfolioSelected(): void {
  }

  positionSelected(): void {
  }

  onPortfolioCreated(event: PortfolioCreatedEvent | any) {
    this.portfolioToSelectId = event.portfolioId;
    this.getPortfolios();
  }

  onPositionCreated(event: PositionCreatedEvent | any) {
    this.portfolioToSelectId = event.portfolioId;
    this.positionToSelectId = event.positionId;
    this.getPortfolios();
  }

  onValueCreated(event: ValueCreatedEvent | any) {
    this.portfolioToSelectId = event.portfolioId;
    this.positionToSelectId = event.positionId;
    this.valueToSelectId = event.valueId;
    this.getPortfolios();
  }

  selectPortfolio() {
    const filtered: Array<Portfolio> = this.portfolios.filter(
      (portfolio) => portfolio.id == this.portfolioToSelectId
    );
    if (filtered.length > 0) {
      this.selectedPortfolio = filtered[0];
    }
  }

  selectPosition() {
    const filteredPortfolios: Array<Portfolio> = this.portfolios.filter(
      (portfolio) => portfolio.id == this.portfolioToSelectId
    );
    if (filteredPortfolios.length > 0) {
      const filteredPositions: Array<Position> =
        filteredPortfolios[0].positions.filter(
          (position) => position.id == this.positionToSelectId
        );
      if (filteredPositions.length > 0) {
        this.selectedPosition = filteredPositions[0];
      }
    }
  }

  selectValue() {
    const filteredPortfolios: Array<Portfolio> = this.portfolios.filter(
      (portfolio) => portfolio.id == this.portfolioToSelectId
    );
    if (filteredPortfolios.length > 0) {
      const filteredPositions: Array<Position> =
        filteredPortfolios[0].positions.filter(
          (position) => position.id == this.positionToSelectId
        );
      if (filteredPositions.length > 0) {
        const filteredValues: Array<Value> = filteredPositions[0].values.filter(
          (value) => value.id == this.valueToSelectId
        );
        if (filteredValues.length > 0) {
          this.selectedValue = filteredValues[0];
        }
      }
    }
  }
}
