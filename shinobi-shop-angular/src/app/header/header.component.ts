import {Component, OnInit} from '@angular/core';
import {ShoeService} from "../service/shoe.service";
import {TokenStorageService} from "../service/token-storage.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  quantityCart = 0;
  username: string;
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;

  constructor(private shoeService: ShoeService,
              private tokenService: TokenStorageService,
              private router: Router) {
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

    if (this.username !== '') {
      this.shoeService.findCustomer(this.username).subscribe(customer => {
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
  }

  whenLogout() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'warning',
      title: 'Đăng xuất thành công!'
    });

    this.tokenService.logOut();
    this.router.navigateByUrl('');
    this.username = '';
    this.isCustomer = false;
    this.isEmployee = false;
    this.isAdmin = false;
  }

  getLoginToCart() {
    if (this.username === '' || this.username === null || this.username === undefined) {
      this.router.navigateByUrl('login');
    } else {
      this.router.navigateByUrl('cart');
    }
  }

  getLoginToHistory() {
    if (this.username === '' || this.username === null || this.username === undefined) {
      this.router.navigateByUrl('login');
    } else {
      this.router.navigateByUrl('history');
    }
  }
}
