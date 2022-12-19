import {Component, OnInit} from '@angular/core';
import {ShoeService} from "../../service/shoe.service";
import {IShoeDto} from "../../model/i-shoe-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {IShoeSizeDto} from "../../model/i-shoe-size-dto";
import {ICustomer} from "../../model/i-customer";
import {IEmployee} from "../../model/i-employee";
import Swal from 'sweetalert2';

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
  customer: ICustomer;
  employee: IEmployee;
  idUser: number;
  quantitySellByShoe = 0;

  constructor(private shoeService: ShoeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params.id);

    this.getAllSizeByShoe();
    this.getShoeById();
    this.getQuantitySellByShoe();

    this.getCustomer();
    this.getEmployee();
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

  getCustomer(): void {
    this.shoeService.findCustomer().subscribe(value => {
        this.customer = value;

        if (this.customer != null) {
          this.idUser = this.customer.id;
        }
      },
      error => {
        console.log(error);
      });
  }

  getEmployee(): void {
    this.shoeService.findEmployee().subscribe(value => {
        this.employee = value;

        if (this.employee != null) {
          this.idUser = this.employee.id;
        }
      },
      error => {
        console.log(error);
      });
  }

  addToCart(): void {
    this.shoeService.addToCart(this.quantityChoose, this.idUser, this.shoeSizeIdChoose).subscribe(() => {
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
        icon: 'success',
        title: 'Thêm vào giỏ hàng thành công!'
      })

      // this.router.navigateByUrl("cart");
    }, error => {
      console.log(error);
    }, () => {
      location.reload()
    });
  }
}
