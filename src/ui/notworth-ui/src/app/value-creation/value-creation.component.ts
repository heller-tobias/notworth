import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValueCreatedEvent } from '../events/value-created-event';
import { MessageService } from '../message.service';
import { Portfolio } from '../models/portfolio';
import { Position } from '../models/position';
import { DefaultValue, Value } from '../models/value';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-value-creation',
  templateUrl: './value-creation.component.html',
  styleUrls: ['./value-creation.component.scss'],
})
export class ValueCreationComponent implements OnInit {
  @Input() portfolio?: Portfolio;
  @Input() position?: Position;
  @Input() value: Value;
  @Output() created = new EventEmitter<Object>();
  currency: string = 'CHF';
  currentDate: string = new Date().toISOString().split('T')[0];
  forbiddenDates: Array<Date> = [];

  constructor(
    private portfolioService: PortfolioService,
    private messageService: MessageService
  ) {
    this.value = DefaultValue;
  }

  ngOnInit(): void {
    this.forbiddenDates = this.getForbiddenDates();
  }

  createValue() {
    if (this.portfolio && this.position) {
      this.portfolioService
        .createValue(this.portfolio, this.position, this.value)
        .subscribe((valueId) => {
          this.created.emit({
            positionId: this.position?.id,
            portfolioId: this.portfolio?.id,
            valueId: valueId,
          });
        });
    } else {
      console.error('Unable to create Value');
    }
  }

  private getForbiddenDates(): Array<Date> {
    if (this.position) {
      return this.position?.values.map((value) => value.date);
    }
    return [];
  }
}
