import { Component, OnInit } from '@angular/core';
import {ShoeService} from "../../service/shoe.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {ICustomer} from "../../model/i-customer";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customer: ICustomer;
  username: string;
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;

  constructor(private shoeService: ShoeService,
              private tokenService: TokenStorageService,
              private router: Router,
              private title: Title) {
    title.setTitle('Khách hàng');
  }

  ngOnInit(): void {
    this.username = '';
    this.showUsername();
  }

  showUsername() {
    this.username = this.tokenService.getUser().username;
    console.log(this.username);
    this.roles = this.tokenService.getUser().roles;
    this.isCustomer = this.roles.indexOf('ROLE_CUSTOMER') !== -1;
    this.isEmployee = this.roles.indexOf('ROLE_EMPLOYEE') !== -1;
    this.isAdmin = this.roles.indexOf('ROLE_ADMIN') !== -1;

    if (this.username !== '' && this.username !== undefined) {
      this.shoeService.findCustomer(this.username).subscribe(customer => {
          if (customer != null) {
            this.customer = customer;
            console.log(this.customer)
          }
        },
        error => {
          console.log(error);
        });
    }
  }
}
