import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Order } from '../../interfaces/order';
import { OrdersService } from '../../orders/orders.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  order: Order[];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  private orderByMonth: { month: string, count: number }[] = [];

  constructor(private os: OrdersService) { }

  private createSvg(): void {
    this.svg = d3.select('figure#bar')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }
  private drawBars(data): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(this.months)
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 300])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g')
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.month))
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => this.height - y(d.count))
      .attr('fill', '#879cc4');
  }

  handelOrdersComplete = (response: any) => {

    const arr = Array<number>(12).fill(0);

    const getMonth = response.orders.map(item => arr[new Date(item.date).getMonth()] += 1);

    for (let i = 1; i < 13; i++) {
      this.orderByMonth.push({ month: this.months[i - 1], count: arr[i - 1] });
    }
  }

  ngOnInit(): void {
    this.createSvg();
    this.os.getAllOrders();
    this.os.subjectOrder.subscribe(response => {
      this.handelOrdersComplete(response);
      this.drawBars(this.orderByMonth);
    },
      error => {
        console.log(error);
      }
    );
  }
}



