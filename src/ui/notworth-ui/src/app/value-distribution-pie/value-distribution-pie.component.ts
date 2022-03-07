import { Component, Input, OnInit } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-value-distribution-pie',
  templateUrl: './value-distribution-pie.component.html',
  styleUrls: ['./value-distribution-pie.component.scss']
})
export class ValueDistributionPieComponent implements OnInit {
  
  @Input() title?: string = "";
  @Input() colors?: Array<any>;
  @Input() chartData?: Array<any>;
  view: [number, number] = [1100, 350];

  constructor() {}

  ngOnInit(): void {}
}