import { ViewportScroller } from '@angular/common';
import {
  compileComponentFromMetadata,
  getSafePropertyAccessString,
} from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { config } from 'src/app/config';
import { EmailService } from 'src/app/Service/email.service';
import { faBaby } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
})
export class AppLayoutComponent implements OnInit {
  year: any;
  isSpinning = true;
  spinner = false;
  spinner2 = false;
  contactForm!: FormGroup;
  contactForm2!: FormGroup;
  submitted: boolean = false;
  showDashboard = false;
  showBlank = true;
  baby = faBaby;
  emailError: boolean = false;
  recipientNameError: boolean = false;
  phoneNumberError: boolean = false;
  referalCodeError: boolean = false;
  emailError2: boolean = false;
  recipientNameError2: boolean = false;
  phoneNumberError2: boolean = false;
  referalCodeError2: boolean = false;
  referalCode: any;
  isVisible = false;
  isConfirmLoading = false;
  constructor(
    private scroller: ViewportScroller,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _emailService: EmailService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxService.startLoader('loader-01');
    // start foreground spinner of the loader "loader-01" with 'default' taskId
    // Stop the foreground loading after 5s

    setTimeout(() => {
      this.ngxService.stopLoader('loader-01');
      this.showDashboard = true;
      this.showBlank = false; // stop foreground spinner of the loader "loader-01" with 'default' taskId
    }, 2000);
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

  gotoCareer() {
    this.router.navigateByUrl('/careers').then(() => {
      window.location.reload();
    });
  }

  gotoHome() {
    this.router.navigateByUrl('/home').then(() => {
      window.location.reload();
    });
  }
}
