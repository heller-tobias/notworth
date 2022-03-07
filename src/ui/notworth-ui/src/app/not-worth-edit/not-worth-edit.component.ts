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
      console.log(
        'selected portfolio 1: ' +
          this.selectedPortfolio.id +
          ' ' +
          this.selectedPortfolio.name
      );
      this.selectPortfolio();
      this.selectPosition();
      this.selectValue();
      console.log(
        'selected portfolio 2: ' +
          this.selectedPortfolio.id +
          ' ' +
          this.selectedPortfolio.name
      );
    });
  }

  portfolioSelected(): void {
    console.log(this.selectedPortfolio);
  }

  positionSelected(): void {
    console.log(this.selectedPosition);
  }

  onPortfolioCreated(event: PortfolioCreatedEvent | any) {
    console.log('portolio created with id: ' + event.portfolioId);
    this.portfolioToSelectId = event.portfolioId;
    this.getPortfolios();
  }

  onPositionCreated(event: PositionCreatedEvent | any) {
    console.log(
      'portolio  with id: ' +
        event.portfolioId +
        ' position created with id: ' +
        event.positionId
    );
    this.portfolioToSelectId = event.portfolioId;
    this.positionToSelectId = event.positionId;
    this.getPortfolios();
  }

  onValueCreated(event: ValueCreatedEvent | any) {
    console.log(
      'portolio  with id: ' +
        event.portfolioId +
        ' position  with id: ' +
        event.positionId +
        ' value created with id: ' +
        event.valueId
    );
    this.portfolioToSelectId = event.portfolioId;
    this.positionToSelectId = event.positionId;
    this.valueToSelectId = event.valueId;
    this.getPortfolios();
  }

  selectPortfolio() {
    console.log('select portfolio with id: ' + this.portfolioToSelectId);
    const filtered: Array<Portfolio> = this.portfolios.filter(
      (portfolio) => portfolio.id == this.portfolioToSelectId
    );
    console.log(this.portfolios);
    if (filtered.length > 0) {
      console.log('set selected portfolio: ' + filtered[0]);
      this.selectedPortfolio = filtered[0];
    }
  }

  selectPosition() {
    console.log('select position with id: ' + this.positionToSelectId);
    const filteredPortfolios: Array<Portfolio> = this.portfolios.filter(
      (portfolio) => portfolio.id == this.portfolioToSelectId
    );
    if (filteredPortfolios.length > 0) {
      const filteredPositions: Array<Position> =
        filteredPortfolios[0].positions.filter(
          (position) => position.id == this.positionToSelectId
        );
      if (filteredPositions.length > 0) {
        console.log('set selected position: ' + filteredPositions[0]);
        this.selectedPosition = filteredPositions[0];
      }
    }
  }

  selectValue() {
    console.log('select value with id: ' + this.valueToSelectId);
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
          console.log('set selected value: ' + filteredValues[0]);
          this.selectedValue = filteredValues[0];
        }
      }
    }
  }
}
