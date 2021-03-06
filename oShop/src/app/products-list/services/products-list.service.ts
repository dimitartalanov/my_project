import { AbstractFirebaseService } from '../../shared/services';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from './../../shared/services/auth.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';


@Injectable()
export class ProductsListService extends AbstractFirebaseService<any> {
  smartPhones = new BehaviorSubject([]);
  batch = 4;
  lastKey = '';
  finished = false;
  private smarthPhonesFilter: FirebaseListObservable<any[]>;
  private listProduct: FirebaseListObservable<any[]>;
  constructor(
    protected db: AngularFireDatabase,
    protected authService: AuthService,
  ) {
    super(db, authService);

  }
  get entityPath(): string {
    return `/smartphones`;
  }
  getPhonesWhenScroll(batch, prop, value, lastKey?) {

    let query;
    if (prop === '') {
      query = {
        orderByKey: true,
        limitToFirst: batch,
      };
    } else {

      query = {
        orderByChild: prop,
        startAt: value,
        endAt: value + '\uf8ff',
      };
    }
    if (lastKey) {
      query['startAt'] = lastKey;
    }
    return this.getList({ query });
  }

  getSmarthphones(prop, value?, key?) {
    if (this.finished) {
      return;
    }

    this.getPhonesWhenScroll(this.batch + 1, prop, value, this.lastKey)
      .do(phones => {

        this.lastKey = _.last(phones)['$key'];

        const newPhones = _.slice(phones, 0, this.batch);


        const currentPhones = this.smartPhones.getValue();

        if (this.lastKey === _.last(newPhones)['$key']) {
          this.finished = true;
        }

        this.smartPhones.next(_.concat(currentPhones, newPhones));

      }).take(1).subscribe();


    return this.smartPhones;
  }

  isFInishedScroll() {
    return this.finished;
  }
  getPhonesFilter(filters) {
    for (let i = 0; i < filters.length; i += 1) {
      const prop = filters[i].prop;
      const value = filters[i].value;
      const items = [];
      this.listProduct = this.getPhonesWhenScroll(0, prop, value);
      return this.listProduct.map((item) => {

        item.forEach((product) => {
          this.get(product.$key)
            .subscribe((phone) => {
              items.push(phone);
            });
        });
        return items;
      });
    }
  }

  getProduct(queryProductId) {

    const items = [];
    this.listProduct = this.getList({

      query: {
        orderByChild: 'iserId',
        equalTo: queryProductId
      }

    }); return this.listProduct.map((item) => {

      item.forEach((product) => {
        this.get(product.$key)
          .subscribe((phone) => {
            items.push(phone);
          });
      });
      return items;
    });
  }
}
