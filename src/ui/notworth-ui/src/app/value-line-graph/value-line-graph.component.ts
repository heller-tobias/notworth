import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-value-line-graph',
  templateUrl: './value-line-graph.component.html',
  styleUrls: ['./value-line-graph.component.scss'],
})
export class ValueLineGraphComponent implements OnInit {
  @Input() colors?: Array<any>;
  @Input() chartData?: Array<any>;
  view: [number, number] = [1100, 350];
  yAxisLabel: string = 'Value in CHF';

  constructor() {}

  ngOnInit(): void {}
}
