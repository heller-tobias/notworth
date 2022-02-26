import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from '../message.service';
import { Category } from '../models/category';
import { Portfolio } from '../models/portfolio';
import { DefaultPosition, Position } from '../models/position';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-position-creation',
  templateUrl: './position-creation.component.html',
  styleUrls: ['./position-creation.component.scss']
})
export class PositionCreationComponent implements OnInit {

  @Input() portfolio?: Portfolio;
  @Input() position: Position;
  @Output() created = new EventEmitter<Object>();

  categories?: Array<Category>;

  constructor(private portfolioService: PortfolioService, private messageService: MessageService) {
    this.position = DefaultPosition;
  }

  ngOnInit(): void {
    this.getCategories();
  }

  createPosition() {
    console.log(this.position);
    if (this.portfolio) {
      this.portfolioService.createPosition(this.portfolio, this.position).subscribe(positionId => {
        console.log(positionId);
        this.created.emit({"positionId":positionId, "portfolioId": this.portfolio?.id});
      });

    } else {
      console.error("Unable to create Position");
    }
  }

  getCategories() {
    if (this.portfolio) {
      this.portfolioService.getCategories(this.portfolio).subscribe(categories => this.categories = categories);
    }
  }
}
