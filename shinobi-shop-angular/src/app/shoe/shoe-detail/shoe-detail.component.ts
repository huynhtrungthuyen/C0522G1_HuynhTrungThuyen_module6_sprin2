import {Component, OnInit} from '@angular/core';
import {ShoeService} from "../../service/shoe.service";
import {IShoeDto} from "../../model/i-shoe-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {IShoeSizeDto} from "../../model/i-shoe-size-dto";
import {ICustomer} from "../../model/i-customer";
import {IEmployee} from "../../model/i-employee";
import Swal from 'sweetalert2';
import {TokenStorageService} from "../../service/token-storage.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-shoe-detail',
  templateUrl: './shoe-detail.component.html',
  styleUrls: ['./shoe-detail.component.css']
})
export class ShoeDetailComponent implements OnInit {
  id: number;
  shoe: IShoeDto;
  quantityChoose = 1;
  shoeSizeList: IShoeSizeDto[];
  shoeSizeIdChoose = 0;
  idUser: number;
  quantitySellByShoe = 0;
  username: string;
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;

  constructor(private shoeService: ShoeService,
              private activatedRoute: ActivatedRoute,
              private tokenService: TokenStorageService,
              private router: Router,
              private title: Title) {
    title.setTitle('Thông tin giày');
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params.id);

    this.getAllSizeByShoe();
    this.getShoeById();
    this.getQuantitySellByShoe();

    this.username = '';
    this.showUsername();
  }

  getShoeById(): void {
    this.shoeService.findShoeById(this.id).subscribe(value => {
        this.shoe = value;
      },
      error => {
        console.log(error);
      });
  }

  getQuantitySellByShoe(): void {
    this.shoeService.getQuantitySellById(this.id).subscribe(value => {
        this.quantitySellByShoe = value;
      },
      error => {
        console.log(error);
      });
  }

  descQuantity(): void {
    this.quantityChoose--;
  }

  ascQuantity(): void {
    this.quantityChoose++;
  }

  getAllSizeByShoe(): void {
    this.shoeService.findAllSizeByShoe(this.id).subscribe(value => {
        this.shoeSizeList = value;
      },
      error => {
        console.log(error);
      });
  }

  chooseShoeSize(id: number): void {
    this.quantityChoose = 1;
    this.shoeSizeIdChoose = id;
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
            this.idUser = customer.id;
            console.log(this.idUser)
          }
        },
        error => {
          console.log(error);
        });
    }
  }

  addToCart(): void {
    this.shoeService.addToCart(this.quantityChoose, this.idUser, this.shoeSizeIdChoose).subscribe(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Thêm vào giỏ hàng thành công!'
      }).then(r => location.replace('cart'))

      // this.router.navigateByUrl("cart");
    }, error => {
      console.log(error);
    });
  }
}
