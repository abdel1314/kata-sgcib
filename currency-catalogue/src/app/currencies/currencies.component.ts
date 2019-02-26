import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyList, Currency } from './../model';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.less']
})

export class CurrenciesComponent implements OnInit {

  currencies: CurrencyList[];
  allCurrenciesSize: number;
  page: number = 1;
  selectedSize: number = 10;
  search: string = '';
  filterList: {};
  filter: string;

  currenciesPerPage: { page: number }[] = [
    { page: 10 },
    { page: 50 },
    { page: 100 }
  ];

  constructor(private service: AppService) { }

  ngOnInit() {
    this.serachCurrencies();
  }

  getCurrencies() {
    this.service.getCurrency(this.page, this.filter, this.search, this.selectedSize)
      .subscribe(currencies => this.currencies = currencies);
  }

  serachCurrencies() {
    this.service.searchCurrency(this.search)
      .subscribe(currencies => {
        this.allCurrenciesSize = currencies.length;
        this.filterList = Object.keys(currencies[0]);
        this.filter = this.filterList[0];
        this.getCurrencies();
      });
  }

}
