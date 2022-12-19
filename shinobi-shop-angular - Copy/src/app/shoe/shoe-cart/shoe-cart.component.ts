import {Component, OnInit} from '@angular/core';
import {ShoeService} from "../../service/shoe.service";
import {ICart} from "../../model/i-cart";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-shoe-cart',
  templateUrl: './shoe-cart.component.html',
  styleUrls: ['./shoe-cart.component.css']
})
export class ShoeCartComponent implements OnInit {
  cart: ICart[];
  totalPrice = 0;
  finalPrice = 0;

  constructor(private shoeService: ShoeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCustomer();
    this.getEmployee();
  }

  getCustomer(): void {
    this.shoeService.findCustomer().subscribe(customer => {
        if (customer != null) {
          this.shoeService.findCartByUser(customer.id).subscribe(value => {
              this.cart = value;

              for (let item of value) {
                this.totalPrice += item.price * item.quantity;
                this.finalPrice += item.price * (1 - item.discount / 100) * item.quantity;
              }
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
          this.shoeService.findCartByUser(employee.id).subscribe(value => {
              this.cart = value;

              for (let item of value) {
                this.totalPrice += item.price * item.quantity;
                this.finalPrice += item.price * (1 - item.discount / 100) * item.quantity;
              }
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

  descQuantity(id: number): void {
    this.shoeService.descQuantityCart(id).subscribe(() => {
      location.reload();
    }, error => {
      console.log(error);
    });
  }

  ascQuantity(id: number): void {
    this.shoeService.ascQuantityCart(id).subscribe(() => {
      location.reload();
    }, error => {
      console.log(error);
    });
  }

  removeCart(id: number): void {
    Swal.fire({
      title: 'Bạn có chắc?',
      text: "Xóa sản phẩm này khỏi giỏ hàng!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, tôi muốn xóa!',
      cancelButtonText: 'Đóng'
    }).then((result) => {
      if (result.isConfirmed) {
        this.shoeService.removeCartById(id).subscribe(() => {
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
            title: 'Xóa khỏi giỏ hàng thành công!'
          })

          location.reload();
        }, error => {
          console.log(error);
        });
      }
    })
  }

  updateCart() {
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
      title: 'Cập nhật giỏ hàng thành công!'
    })
  }
}
