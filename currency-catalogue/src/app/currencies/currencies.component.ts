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
  allCurrencies: CurrencyList[];
  page: number = 1;
  selectedSize: number = 10;
  search: string;
  filterList: {};
  filter: string;

  currenciesPerPage: {page: number}[] = [
    {page: 10},
    {page: 50},
    {page: 100}
  ];

  constructor(private service: AppService) { }

  ngOnInit() {
    this.getAllCurrencies();
    this.getCurrencyPagination();
  }

  getCurrencyPagination () {
    this.service.getCurrencyPagination(this.page, this.selectedSize)
    .subscribe(currencies => this.currencies = currencies);
  }

  getAllCurrencies() {
    this.service.getAllCurrency()
      .subscribe(currencies => {
        this.allCurrencies = currencies;
        this.filterList = Object.keys(currencies[0]);
        this.filter = this.filterList[0];
      });
  }

  searchCurrencies() {
    this.service.searchCurrencies(this.search)
      .subscribe(currencies => {
        this.currencies = currencies;
        this.allCurrencies = currencies;
      });
  }

  filterCurrencies() {
    this.service.filterCurrencies(this.filter)
      .subscribe(currencies => {
        this.currencies = currencies;
        this.allCurrencies = currencies;
      });
    this.search = "";
  }

}
