import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { SmartphonesComponent } from './smartphones/smartphones.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { FormsModule } from '@angular/forms';
import { UserDeleteComponent } from './users/user-delete/user-delete.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SmartphonesCounterComponent } from './header/smartphones-counter/smartphones-counter.component';
import { UsersCounterComponent } from './header/users-counter/users-counter.component';
import { OrdersCounterComponent } from './header/orders-counter/orders-counter.component';
import { UpdateOrderComponent } from './orders/update-order/update-order.component';
import { OrderSearchComponent } from './orders/order-search/order-search.component';
import { BarChartComponent } from './d3/bar-chart/bar-chart.component';
import { OrdersService } from './orders/orders.service';
import { LoginComponent } from './login/login.component';
import { SmartphoneUpdateCreate } from './smartphones/SmartphoneUpdateCreate/smartphone-update-create.component';
import { ConnectionCounterComponent } from './header/connection-counter/connection-counter.component';
import { D3Component } from './d3/d3.component';
import { PieChartComponent } from './d3/pie-chart/pie-chart.component';
import { ScatterPlotComponent } from './d3/scatter-plot/scatter-plot.component';
const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    OrdersComponent,
    UsersComponent,
    SmartphonesComponent,
    UserCreateComponent,
    UserDeleteComponent,
    SmartphonesCounterComponent,
    UsersCounterComponent,
    OrdersCounterComponent,
    UpdateOrderComponent,
    OrderSearchComponent,
    BarChartComponent,
    LoginComponent,
    SmartphoneUpdateCreate,
    ConnectionCounterComponent,
    D3Component,
    PieChartComponent,
    ScatterPlotComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
