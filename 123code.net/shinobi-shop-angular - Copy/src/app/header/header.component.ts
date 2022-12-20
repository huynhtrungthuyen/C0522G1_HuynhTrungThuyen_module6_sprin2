import { Component, OnInit } from '@angular/core';
import {ShoeService} from "../service/shoe.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  quantityCart = 0;
  user: any;

  constructor(private shoeService: ShoeService) {
  }

  ngOnInit(): void {
    this.getCustomer();
    this.getEmployee();
  }

  getCustomer(): void {
    this.shoeService.findCustomer().subscribe(customer => {
        this.user = customer;

        if (customer != null) {
          this.shoeService.sumQuantityCartById(customer.id).subscribe(value => {
            this.quantityCart = value;
              console.log(this.quantityCart);
            },
            error => {
              console.log(error);
            });
        }
      },
      error => {
        console.log(error);
      });
  }

  getEmployee(): void {
    this.shoeService.findEmployee().subscribe(employee => {
        if (employee != null) {
          this.user = employee;

          this.shoeService.sumQuantityCartById(employee.id).subscribe(value => {
              this.quantityCart = value;
              console.log(this.quantityCart);
            },
            error => {
              console.log(error);
            });
        }
      },
      error => {
        console.log(error);
      });
  }

}
