import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { SmartphonesComponent } from './smartphones/smartphones.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserDeleteComponent } from './users/user-delete/user-delete.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'users', component: UsersComponent,
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
  ], },
  { path: 'smartphones', component: SmartphonesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
