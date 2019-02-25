import { Routes, RouterModule } from '@angular/router';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';

export const routes: Routes = [
    {
      path: 'currencies',
      component: CurrenciesComponent
    },
    { path: '',   redirectTo: '/currencies', pathMatch: 'full' },
    { path: 'currency/:id', component: CurrencyDetailComponent }
  ];

export const routing = RouterModule.forRoot(routes)