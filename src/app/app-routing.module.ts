import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, authGuardLogin } from './Core/Guards/auth.guard';

const routes: Routes = [
  {
    canActivate: [authGuard],
    path: '',
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'Cart',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
        title: 'Wish List',
      },
      {
        path: 'productdetails/:id',
        loadComponent: () =>
          import('./components/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent
          ),
        title: 'Product details',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'forgotpassword',
        loadComponent: () =>
          import('./components/forgotpassword/forgotpassword.component').then(
            (m) => m.ForgotpasswordComponent
          ),
        title: 'Forgot Password',
      },
      {
        path: 'updatepassword',
        loadComponent: () =>
          import('./components/update-password/update-password.component').then(
            (m) => m.UpdatePasswordComponent
          ),
        title: 'Update Password',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'All orders',
      },
      {
        path: 'payment/:id',
        loadComponent: () =>
          import('./components/payment/payment.component').then(
            (m) => m.PaymentComponent
          ),
        title: 'Payment',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'categorydetails/:id',
        loadComponent: () =>
          import('./components/categoreydetails/categoreydetails.component').then(
            (m) => m.CategoreydetailsComponent
          ),
        title: 'Category details',
      },
    ],
  },

  {
    canActivate:[authGuardLogin],
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forgotpasswordAuth',
        loadComponent: () =>
          import('./components/forgotpassword/forgotpassword.component').then(
            (m) => m.ForgotpasswordComponent
          ),
        title: 'Forgot Password',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
    title: 'Notfound',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
