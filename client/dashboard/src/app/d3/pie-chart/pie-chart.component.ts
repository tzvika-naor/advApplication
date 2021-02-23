import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { OrdersService } from 'src/app/orders/orders.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
  private dates = [];
  private countOrdersByMonth = [];
  private accumulateMonth = [];
  private bla = [];
  private createOnce = true;
  private monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June',
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  constructor(private os: OrdersService) { }

  ngOnInit(): void {


    this.os.getAllOrders();
    this.os.subjectOrder.subscribe((response: any) => {
      console.log(response);
      if (this.createOnce) {
        this.dates = response.orders.map(order => order.date);
        this.accumulate();
        this.createSvg();
        this.createColors();
        this.drawChart();
        this.createOnce = false;
      }
      else {
        this.drawChart();
      }
    });
  }

  private accumulate() {
    const arr = Array<number>(12).fill(0);
    const accumulate = [];
    console.log(this.dates);
    const getMonth = this.dates.map(date => new Date(date).getMonth());
    console.log(getMonth);
    getMonth.map(month => arr[month] += 1);
    let i = 0;
    for (i;i < 12;i++) {
      this.bla.push({ name: this.monthNames[i], value: arr[i] });
    }
    console.log(this.bla);
  }
  private createSvg(): void {
    this.svg = d3.select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }
  private createColors(): void {
    console.log(this.bla);
    this.colors = d3.scaleOrdinal()
      .domain(this.bla.map(d => d.value.toString()))
      .range(['#4682B4', '#6495ED', '#879cc4', '#00BFFF', '#1E90FF', '#87CEFA', '#FF69B4', '#800080', '#7B68EE', '#DDA0DD', '#8B008B', '#00FA9A', '#008B8B'
        ,'#D8BFD8']);
    console.log(this.colors);
  }
  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.value));
    console.log(pie);
    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.bla))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d, i) => (this.colors(i)))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    console.log(this.bla.map(i => i.name));
    this.svg
      .selectAll('pieces')
      .data(pie(this.bla))
      .enter()
      .append('text')
      .text(d => (d.data.name))
      .attr('transform', d => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 12).style('font-weight', 700);
  }
}
