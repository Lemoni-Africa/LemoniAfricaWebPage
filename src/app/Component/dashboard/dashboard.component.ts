import { ViewportScroller } from '@angular/common';
import { getSafePropertyAccessString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { config } from 'src/app/config';
import { EmailService } from 'src/app/Service/email.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  year: any;
  isSpinning = true;
  spinner = false;
  contactForm!: FormGroup;
  submitted: boolean = false;
  showDashboard = false;
  showBlank = true;
  constructor(
    private scroller: ViewportScroller,
    private router: Router,
    private _emailService: EmailService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.getYear();

    this.ngxService.startLoader('loader-01'); // start foreground spinner of the loader "loader-01" with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stopLoader('loader-01');
      this.showDashboard = true;
      this.showBlank = false; // stop foreground spinner of the loader "loader-01" with 'default' taskId
    }, 2000);

    this.contactForm = this.formBuilder.group({
      recipientName: ['', Validators.required],
      recipientPhoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      recipientEmail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  //Get year
  getYear() {
    let myDate = new Date();
    this.year = myDate.getFullYear();
  }

  //Scrolling of Page
  goToDynamic(el: any) {
    const myElement: any = document.getElementById(el);
    myElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  emailSender() {
    this.spinner = true;
    let body: any = `Dear ${this.contactForm.value.recipientName}, 
    <br><br> We are excited to have you on the Lemon Exchange waitlist and we can't wait to have you experience the delight of using our platform to buy, sell or store your cryptocurrencies with ease. <br> 
    Share the <a href="https://lemonexchange.africa">Link</a> to get your friends on the waitlist <br> Best Regards <br>  
    <br> <br>
    <img src=https://res.cloudinary.com/dkjje7jd8/image/upload/v1646421952/1_tffprv-media_lib_thumb_f8bxl2.png />`;
    let templateHtml = `Dear ${this.contactForm.value.recipientName}, 
    <br><br> We are excited to have you on the Lemon Exchange waitlist and we can't wait to have you experience the delight of using our platform to buy, sell or store your cryptocurrencies with ease. <br> 
    Share the <a href="https://lemonexchange.africa">Link</a> to get your friends on the waitlist <br> Best Regards <br>  
    <br> <br>
    <img src=https://res.cloudinary.com/dkjje7jd8/image/upload/v1646421952/1_tffprv-media_lib_thumb_f8bxl2.png />`;
    this._emailService
      .sendEmail(
        config.senderName,
        config.senderEmail,
        this.contactForm.value.recipientName,
        this.contactForm.value.recipientEmail,
        this.contactForm.value.recipientPhoneNumber,
        config.subject,
        body,
        templateHtml,
        config.client,
        config.bcc
      )
      .subscribe(
        (res: any) => {
          if (res.isSuccessful) {
            this.spinner = false;
            this.contactForm.reset();
            this.notification.success('Email', 'Email Sent!!!', {
              nzPlacement: 'bottomRight',
            });
          }
          if (!res.isSuccessful) {
            this.spinner = false;
            this.notification.error('Email', 'Please try again!!!', {
              nzPlacement: 'bottomRight',
            });
          }
        },
        (error) => {
          this.spinner = false;
          this.notification.error('Email', 'Please try again!!!', {
            nzPlacement: 'bottomRight',
          });
        }
      );
  }

  isFieldValid(field: any) {
    return (
      !this.contactForm.get(field)?.valid &&
      this.contactForm.get(field)?.touched
    );
  }
}

// {
//   "isSuccessful": true,
//   "responseMessage": "Mail Sent Successfully!!!"
// }
