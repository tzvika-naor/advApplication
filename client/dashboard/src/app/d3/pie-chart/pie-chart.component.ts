import { Component, OnInit } from '@angular/core';
// import * as d3 from 'd3';
// import { OrdersService } from 'src/app/orders/orders.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

//   private svg;
//   private margin = 50;
//   private width = 750;
//   private height = 600;
//   // The radius of the pie chart is half the smallest side
//   private radius = Math.min(this.width, this.height) / 2 - this.margin;
//   private colors;
//   private dates = [];
//   private countOrdersByMonth = [];
//   private accumulateMonth = [];
//   private bla = [];
//   private monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'];
//   constructor(private os: OrdersService) { }

  ngOnInit(): void {

//     this.createSvg();
//     this.createColors();
//     this.drawChart();
//     this.os.getAllOrders();
//     this.os.subjectOrder.subscribe((response: any) => {
//       console.log(response);
//       this.dates = response.orders.map(order => order.date);
//       this.accumulate();
//     });
  }

//   private accumulate() {
//     const arr = Array<number>(12).fill(0);
//     const accumulate = [];
//     console.log(this.dates);
//     const getMonth = this.dates.map(date => new Date(date).getMonth());
//     console.log(getMonth);
//     getMonth.map(month =>  arr[month] += 1);
//     let i = 0;
//     for (i; i < 12; i++) {
//       this.bla.push({ name: this.monthNames[i], value: arr[i] });
//     }
//     console.log(this.bla);
//   }
//   private createSvg(): void {
//     this.svg = d3.select('figure#pie')
//       .append('svg')
//       .attr('width', this.width)
//       .attr('height', this.height)
//       .append('g')
//       .attr(
//         'transform',
//         'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
//       );
//   }
//   private createColors(): void {
//     console.log(this.bla);
//     this.colors = d3.scaleOrdinal()
//     .domain(this.bla.map(d => d.value.toString()))
//     .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782' ,'#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782', '#677795', '#5a6782' ]);
// }
// private drawChart(): void {
//   // Compute the position of each group on the pie:
//   const pie = d3.pie<any>().value((d: any) => Number(d.value));
//   console.log(pie);
//   // Build the pie chart
//   this.svg
//   .selectAll('pieces')
//   .data(pie(this.bla))
//   .enter()
//   .append('path')
//   .attr('d', d3.arc()
//     .innerRadius(0)
//     .outerRadius(this.radius)
//   )
//   .attr('fill', (d, i) => (this.colors(i)))
//   .attr('stroke', '#121926')
//   .style('stroke-width', '1px');

//   // Add labels
//   const labelLocation = d3.arc()
//   .innerRadius(100)
//   .outerRadius(this.radius);

//   this.svg
//   .selectAll('pieces')
//   .data(pie(this.bla))
//   .enter()
//   .append('text')
//   .text(d => d.name)
//   .attr('transform', d => 'translate(' + labelLocation.centroid(d) + ')')
//   .style('text-anchor', 'middle')
//   .style('font-size', 15);
// }
}
