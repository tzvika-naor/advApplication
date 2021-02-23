import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './d3/bar-chart/bar-chart.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { UpdateOrderComponent } from './orders/update-order/update-order.component';
import { SmartphoneUpdateCreate } from './smartphones/SmartphoneUpdateCreate/smartphone-update-create.component';
import { SmartphonesComponent } from './smartphones/smartphones.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserDeleteComponent } from './users/user-delete/user-delete.component';
import { UsersComponent } from './users/users.component';
import { ScatterPlotComponent } from './d3/scatter-plot/scatter-plot.component';
import { D3Component } from './d3/d3.component';
import { PieChartComponent } from './d3/pie-chart/pie-chart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'd3' , component: D3Component },
  { path: 'd3/bar-chart', component: BarChartComponent },
  { path: 'd3/pie-chart', component: PieChartComponent },
  { path: 'd3/scatter-plot', component: ScatterPlotComponent },

  {
    path: 'orders', component: OrdersComponent,
    children: [
      {
        path: 'update/:id', // child route path
        component: UpdateOrderComponent
      }]
  },
  {
    path: 'users', component: UsersComponent,
    children: [
      {
        path: 'create', // child route path
        component: UserCreateComponent, // child route component that the router renders
      },
      {
        path: 'update/:id', // child route path
        component: UserCreateComponent // child route component that the router renders
      },
      {
        path: 'delete',
        component: UserDeleteComponent,
      },
    ],
  },
  {
    path: 'smartphones', component: SmartphonesComponent,
    children: [
      {
        path: 'create', // child route path
        component: SmartphoneUpdateCreate, // child route component that the router renders
      },
      {
        path: 'update/:id', // child route path
        component: SmartphoneUpdateCreate // child route component that the router renders
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
