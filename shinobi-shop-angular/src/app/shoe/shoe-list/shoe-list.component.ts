import {Component, OnInit} from '@angular/core';
import {ShoeService} from "../../service/shoe.service";
import {BehaviorSubject, Observable} from "rxjs";
import {IShoeDto} from "../../model/i-shoe-dto";
import {IType} from "../../model/i-type";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shoe-list',
  templateUrl: './shoe-list.component.html',
  styleUrls: ['./shoe-list.component.css']
})
export class ShoeListComponent implements OnInit {
  nameS = '';
  manufacturerS = '';
  typeS = '';
  priceStart = 0;
  priceEnd = 9999999;
  sortBy = 'newest';
  page = 1;
  pageSize = 6;
  quantity: number;
  shoeList$: Observable<IShoeDto[]>;
  totalPage: number;
  shoeTypesList$: Observable<IType[]>;
  manufacturer$: Observable<string[]>;

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
    this.getAllShoePaging();
    this.getAllShoeType();
    this.getAllManufacturer();

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
  }

  getAllShoePaging(): void {
    this.shoeService.showListShoe(this.page, this.pageSize, this.nameS, this.manufacturerS, this.typeS,
      this.priceStart, this.priceEnd, this.sortBy).subscribe(value => {
        this.shoeList$ = new BehaviorSubject<IShoeDto[]>(value.content);
        this.quantity = value.totalElements;
        this.totalPage = Math.ceil(this.quantity / this.pageSize);
      },
      error => {
        console.log(error);
      });
  }

  getAllShoeType(): void {
    this.shoeService.findAllShoeType().subscribe(value => {
        this.shoeTypesList$ = new BehaviorSubject<IType[]>(value);
      },
      error => {
        console.log(error);
      });
  }

  getAllManufacturer(): void {
    this.shoeService.findAllManufacturer().subscribe(value => {
        this.manufacturer$ = new BehaviorSubject<string[]>(value);
      },
      error => {
        console.log(error);
      });
  }

  searchAllPrice(): void {
    this.priceStart = 0;
    this.priceEnd = 9999999;
    this.page = 1;
    this.getAllShoePaging();
  }

  searchType(name: string): void {
    this.page = 1;
    this.typeS = name;
    this.getAllShoePaging();
  }

  searchManufacturer(item: string) {
    this.page = 1;
    this.manufacturerS = item;
    this.getAllShoePaging();
  }

  previous(): void {
    this.page--;
    this.getAllShoePaging();
  }

  next(): void {
    this.page++;
    this.getAllShoePaging();
  }

  getPage1(): void {
    this.page = 1;
    this.getAllShoePaging();
  }

  getPageEnd(): void {
    this.page = this.totalPage;
    this.getAllShoePaging();
  }

  getPageP(): void {
    this.page -= 2;
    this.getAllShoePaging();
  }

  getPageN(): void {
    this.page += 2;
    this.getAllShoePaging();
  }

  cleanInput(): void {
    this.nameS = '';
    this.page = 1;
    this.getAllShoePaging();
  }

  getLogin(id: number) {
    if (this.username === '' || this.username === null || this.username === undefined) {
      this.router.navigateByUrl('login');
    } else {
      this.router.navigateByUrl('detail/' + id);
    }
  }
}
