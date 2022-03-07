import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { CurrentTotalValue } from '../models/current-total-value';

@Component({
  selector: 'app-total-current-value',
  templateUrl: './total-current-value.component.html',
  styleUrls: ['./total-current-value.component.scss'],
})
export class TotalCurrentValueComponent implements OnInit {
  @Input() currentTotalValue?: CurrentTotalValue;
  currency: string;

  constructor(private messageService: MessageService) {
    this.currency = 'CHF';
  }

  ngOnInit(): void {}
}
