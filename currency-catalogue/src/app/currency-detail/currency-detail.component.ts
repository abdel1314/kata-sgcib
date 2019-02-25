import { Component, OnInit } from '@angular/core';
import { Currency } from './../model';
import { AppService } from '../app.service';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.less']
})
export class CurrencyDetailComponent implements OnInit {

  id: string;
  currency: Currency[];

  constructor(private service: AppService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.id = params['id']);
  }

  ngOnInit() {
    this.getCurrencyById();
  }

  getCurrencyById() {
    this.service.getCurrencyById(this.id)
      .subscribe(currency => this.currency = currency);
  }
}
