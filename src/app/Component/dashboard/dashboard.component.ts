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
  baby = faBaby;
  emailError: boolean = false;
  recipientNameError: boolean = false;
  phoneNumberError: boolean = false;
  referalCodeError: boolean = false;
  referalCode: any;
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
    this.getReferalCode();
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
      referredBy: [''],
    });
  }

  //Get year
  getYear() {
    let myDate = new Date();
    this.year = myDate.getFullYear();

    var currentdate = new Date();
    var datetime = `${currentdate.getFullYear()}${currentdate.getMonth()}${currentdate.getHours()}${currentdate.getMinutes()}${currentdate.getSeconds()}${currentdate.getMilliseconds()}`;
    console.log(datetime);
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

  getReferalCode() {
    this.referalCode =
      this.activateRoute.snapshot.queryParamMap.get('referalCode');
  }

  emailSender() {
    if (this.referalCode === null) {
      if (
        this.contactForm.value.recipientEmail == '' ||
        this.contactForm.value.recipientPhoneNumber == '' ||
        this.contactForm.value.recipientName == ''
      ) {
        this.emailError = true;
        this.phoneNumberError = true;
        this.recipientNameError = true;
      }
      if (this.contactForm.value.recipientEmail == '') {
        this.emailError = true;
      } else if (this.contactForm.value.recipientPhoneNumber == '') {
        this.phoneNumberError = true;
      } else if (this.contactForm.value.recipientName == '') {
        this.recipientNameError = true;
      } else {
        let myDate = new Date();
        let yr = myDate.getFullYear();
        var currentdate = new Date();
        // var datetime = `${currentdate.getFullYear()}${currentdate.getHours()}${currentdate.getMinutes()}${currentdate.getSeconds()}${currentdate.getMilliseconds()}`;
        const referalCode: any = `LEX-${('0' + currentdate.getDate()).slice(
          -2
        )}${('0' + currentdate.getSeconds()).slice(-2)}${(
          '0' + currentdate.getMilliseconds()
        ).slice(-2)}`;
        this.spinner = true;
        let body: any = `<!DOCTYPE html>
  
        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <style>
            * {
              box-sizing: border-box;
            }
        
            body {
              margin: 0;
              padding: 0;
              background-color: rgb(6, 17, 6) ! important
            }
        
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
            }
        
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
            }
        
            p {
              line-height: inherit
            }
        
            @media (max-width:720px) {
              .icons-inner {
                text-align: center;
              }
        
              .icons-inner td {
                margin: 0 auto;
              }
        
              .row-content {
                width: 100% !important;
              }
        
              .column .border {
                display: none;
              }
        
              .stack .column {
                width: 100%;
                display: block;
              }
            }
          </style>
        </head>
        <body style="background-color: #fbfbfb; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: background-color: rgb(6, 17, 6);" width="100%">
        <div style="position: fixed" id="particles-js"></div>
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:20px;padding-bottom:20px;">
        <div align="center" style="line-height:10px"><img alt="Alternate text" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647795552/lemoniafrica-l_1_preh1h.png" style="display: block; height: auto; border: 0; width: 140px; max-width: 100%;" title="Alternate text" width="140"/></div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f4f4; color: #000000; width: 700px;" width="700">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td style="padding-bottom:25px;padding-left:25px;padding-right:10px;padding-top:30px;;background-color: #6a9a01">
        <div style="font-family: sans-serif">
        <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
        <p style="margin: 0; font-size: 14px;"><span style="font-size:28px;color: white; padding-left: 10px">  Hi ${this.contactForm.value.recipientName}</span></p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td style="padding-bottom:10px;padding-left:25px;padding-right:10px;padding-top:10px;background-color: #6a9a01">
        <div style="font-family: sans-serif">
         <div style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  We are excited to have you on the Lemon Exchange waitlist and can’t wait </span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  to have you experience the delight of using our platform to buy, sell or </span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  store your cryptocurrencies with ease. <br /><br /></span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  An important piece that Lèmoni Africa brings is the human experience. We</span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  understand how complex Crypto trading can be and we always put our users</span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  first, so we came up with a platform that puts security at its core and</span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  requires little documentation for sign up. <br /><br /></span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  Simply click on the <a href="https://lemonexchange.africa/?referalCode=${referalCode}">Link</a> to get three friends on-board; you in turn get a no </span></p>
            <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  charge status on transactions for 14 days.<br /><br /></span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  The Team at Lemon Exchange<br /></span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  <br /></span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 18px;"> </p>
              </div>
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;" width="700">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:55px;">
        <div align="center" style="line-height:10px"><img alt="I'm an image" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647795552/lemoniafrica-l_1_preh1h.png" style="display: block; height: auto; border: 0; width: 140px; max-width: 100%;" title="I'm an image" width="140"/></div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="social_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:35px;text-align:center;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="168px">
        <tr>
        <td style="padding:0 5px 0 5px;"><a href="https://twitter.com/lemoniafrica?s=21" target="_blank"><img alt="Twitter" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/twitter2x_fz9okn.png" style="display: block; height: auto; border: 0;" title="Twitter" width="32"/></a></td>
        <td style="padding:0 5px 0 5px;"><a href="https://instagram.com/lemoniafrica?utm_medium=copy_link" target="_blank"><img alt="Instagram" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/instagram2x_uhmcrr.png" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
        <td style="padding:0 5px 0 5px;"><a href="https://www.linkedin.com/company/lemon-exchange" target="_blank"><img alt="LinkedIn" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/linkedin2x_yleuxo.png" style="display: block; height: auto; border: 0;" title="LinkedIn" width="32"/></a></td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
        <div style="font-family: sans-serif">
        <div style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
        <p style="margin: 0; font-size: 14px; text-align: center;">&copy; ${yr}Lḕmoni Africa. All Rights Reserved</p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
        <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td style="vertical-align: middle; text-align: center;">
        <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
        <!--[if !vml]><!-->
        <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
        <!--<![endif]-->
        <tr>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table><!-- End -->
        
        
        </body>
        </html>`;
        let templateHtml = `<!DOCTYPE html>
  
        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <style>
            * {
              box-sizing: border-box;
            }
        
            body {
              margin: 0;
              padding: 0;
              background-color: rgb(6, 17, 6) ! important
            }
        
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
            }
        
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
            }
        
            p {
              line-height: inherit
            }
        
            @media (max-width:720px) {
              .icons-inner {
                text-align: center;
              }
        
              .icons-inner td {
                margin: 0 auto;
              }
        
              .row-content {
                width: 100% !important;
              }
        
              .column .border {
                display: none;
              }
        
              .stack .column {
                width: 100%;
                display: block;
              }
            }
          </style>
        </head>
        <body style="background-color: #fbfbfb; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: background-color: rgb(6, 17, 6);" width="100%">
        <div style="position: fixed" id="particles-js"></div>
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:20px;padding-bottom:20px;">
        <div align="center" style="line-height:10px"><img alt="Alternate text" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647795552/lemoniafrica-l_1_preh1h.png" style="display: block; height: auto; border: 0; width: 140px; max-width: 100%;" title="Alternate text" width="140"/></div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f4f4; color: #000000; width: 700px;" width="700">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td style="padding-bottom:25px;padding-left:25px;padding-right:10px;padding-top:30px;;background-color: #6a9a01">
        <div style="font-family: sans-serif">
        <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
        <p style="margin: 0; font-size: 14px;"><span style="font-size:28px;color: white; padding-left: 10px">  Hi ${this.contactForm.value.recipientName}</span></p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td style="padding-bottom:10px;padding-left:25px;padding-right:10px;padding-top:10px;background-color: #6a9a01">
        <div style="font-family: sans-serif">
         <div style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  We are excited to have you on the Lemon Exchange waitlist and can’t wait </span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  to have you experience the delight of using our platform to buy, sell or </span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  store your cryptocurrencies with ease. <br /><br /></span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  An important piece that Lèmoni Africa brings is the human experience. We</span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  understand how complex Crypto trading can be and we always put our users</span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  first, so we came up with a platform that puts security at its core and</span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  requires little documentation for sign up. <br /><br /></span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  Simply click on the <a href="https://lemonexchange.africa/?referalCode=${referalCode}">Link</a> to get three friends on-board; you in turn get a no </span></p>
            <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  charge status on transactions for 14 days.<br /><br /></span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  The Team at Lemon Exchange<br /></span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  <br /></span></p>
              <p style="margin: 0; font-size: 18px; mso-line-height-alt: 18px;"> </p>
              </div>
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;" width="700">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:55px;">
        <div align="center" style="line-height:10px"><img alt="I'm an image" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647795552/lemoniafrica-l_1_preh1h.png" style="display: block; height: auto; border: 0; width: 140px; max-width: 100%;" title="I'm an image" width="140"/></div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="social_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:35px;text-align:center;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="168px">
        <tr>
        <td style="padding:0 5px 0 5px;"><a href="https://twitter.com/lemoniafrica?s=21" target="_blank"><img alt="Twitter" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/twitter2x_fz9okn.png" style="display: block; height: auto; border: 0;" title="Twitter" width="32"/></a></td>
        <td style="padding:0 5px 0 5px;"><a href="https://instagram.com/lemoniafrica?utm_medium=copy_link" target="_blank"><img alt="Instagram" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/instagram2x_uhmcrr.png" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
        <td style="padding:0 5px 0 5px;"><a href="https://www.linkedin.com/company/lemon-exchange" target="_blank"><img alt="LinkedIn" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/linkedin2x_yleuxo.png" style="display: block; height: auto; border: 0;" title="LinkedIn" width="32"/></a></td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
        <div style="font-family: sans-serif">
        <div style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
        <p style="margin: 0; font-size: 14px; text-align: center;">&copy; ${yr}Lḕmoni Africa. All Rights Reserved</p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
        <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td style="vertical-align: middle; text-align: center;">
        <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
        <!--[if !vml]><!-->
        <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
        <!--<![endif]-->
        <tr>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table><!-- End -->
        
        
        </body>
        </html>`;

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
            config.bcc,
            this.contactForm.value.referredBy,
            referalCode
          )
          .subscribe(
            (res: any) => {
              console.log(res);
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
    }

    if (this.referalCode !== null) {
      // first check if referal code is valid
      this._emailService.checkerReferalCode(this.referalCode).subscribe(
        (res: any) => {
          if (res.isValid) {
            this.referalCodeError = false;
            if (
              this.contactForm.value.recipientEmail == '' ||
              this.contactForm.value.recipientPhoneNumber == '' ||
              this.contactForm.value.recipientName == ''
            ) {
              this.emailError = true;
              this.phoneNumberError = true;
              this.recipientNameError = true;
            }
            if (this.contactForm.value.recipientEmail == '') {
              this.emailError = true;
            } else if (this.contactForm.value.recipientPhoneNumber == '') {
              this.phoneNumberError = true;
            } else if (this.contactForm.value.recipientName == '') {
              this.recipientNameError = true;
            } else {
              let myDate = new Date();
              let yr = myDate.getFullYear();
              var currentdate = new Date();
              // var datetime = `${currentdate.getFullYear()}${currentdate.getHours()}${currentdate.getMinutes()}${currentdate.getSeconds()}${currentdate.getMilliseconds()}`;
              const referalCode: any = `LEX-${(
                '0' + currentdate.getDate()
              ).slice(-2)}${('0' + currentdate.getSeconds()).slice(-2)}${(
                '0' + currentdate.getMilliseconds()
              ).slice(-2)}`;
              this.spinner = true;
              let body: any = `<!DOCTYPE html>
          
                <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
                <head>
                <title></title>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
                <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
                <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                <style>
                    * {
                      box-sizing: border-box;
                    }
                
                    body {
                      margin: 0;
                      padding: 0;
                      background-color: rgb(6, 17, 6) ! important
                    }
                
                    a[x-apple-data-detectors] {
                      color: inherit !important;
                      text-decoration: inherit !important;
                    }
                
                    #MessageViewBody a {
                      color: inherit;
                      text-decoration: none;
                    }
                
                    p {
                      line-height: inherit
                    }
                
                    @media (max-width:720px) {
                      .icons-inner {
                        text-align: center;
                      }
                
                      .icons-inner td {
                        margin: 0 auto;
                      }
                
                      .row-content {
                        width: 100% !important;
                      }
                
                      .column .border {
                        display: none;
                      }
                
                      .stack .column {
                        width: 100%;
                        display: block;
                      }
                    }
                  </style>
                </head>
                <body style="background-color: #fbfbfb; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                  
                <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: background-color: rgb(6, 17, 6);" width="100%">
                <div style="position: fixed" id="particles-js"></div>
                <tbody>
                <tr>
                <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                <tr>
                <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                <tbody>
                <tr>
                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tr>
                <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:20px;padding-bottom:20px;">
                <div align="center" style="line-height:10px"><img alt="Alternate text" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647795552/lemoniafrica-l_1_preh1h.png" style="display: block; height: auto; border: 0; width: 140px; max-width: 100%;" title="Alternate text" width="140"/></div>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                <tr>
                <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f4f4; color: #000000; width: 700px;" width="700">
                <tbody>
                <tr>
                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                <tr>
                <td style="padding-bottom:25px;padding-left:25px;padding-right:10px;padding-top:30px;;background-color: #6a9a01">
                <div style="font-family: sans-serif">
                <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                <p style="margin: 0; font-size: 14px;"><span style="font-size:28px;color: white; padding-left: 10px">  Hi ${this.contactForm.value.recipientName}</span></p>
                </div>
                </div>
                </td>
                </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                <tr>
                <td style="padding-bottom:10px;padding-left:25px;padding-right:10px;padding-top:10px;background-color: #6a9a01">
                <div style="font-family: sans-serif">
                 <div style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  We are excited to have you on the Lemon Exchange waitlist and can’t wait </span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  to have you experience the delight of using our platform to buy, sell or </span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  store your cryptocurrencies with ease. <br /><br /></span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  An important piece that Lèmoni Africa brings is the human experience. We</span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  understand how complex Crypto trading can be and we always put our users</span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  first, so we came up with a platform that puts security at its core and</span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  requires little documentation for sign up. <br /><br /></span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  Simply click on the <a href="https://lemonexchange.africa/?referalCode=${referalCode}">Link</a> to get three friends on-board; you in turn get a no </span></p>
                    <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  charge status on transactions for 14 days.<br /><br /></span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  The Team at Lemon Exchange<br /></span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  <br /></span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 18px;"> </p>
                      </div>
                </div>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                <tr>
                <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;" width="700">
                <tbody>
                <tr>
                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tr>
                <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:55px;">
                <div align="center" style="line-height:10px"><img alt="I'm an image" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647795552/lemoniafrica-l_1_preh1h.png" style="display: block; height: auto; border: 0; width: 140px; max-width: 100%;" title="I'm an image" width="140"/></div>
                </td>
                </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="social_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tr>
                <td style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:35px;text-align:center;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="168px">
                <tr>
                <td style="padding:0 5px 0 5px;"><a href="https://twitter.com/lemoniafrica?s=21" target="_blank"><img alt="Twitter" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/twitter2x_fz9okn.png" style="display: block; height: auto; border: 0;" title="Twitter" width="32"/></a></td>
                <td style="padding:0 5px 0 5px;"><a href="https://instagram.com/lemoniafrica?utm_medium=copy_link" target="_blank"><img alt="Instagram" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/instagram2x_uhmcrr.png" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
                <td style="padding:0 5px 0 5px;"><a href="https://www.linkedin.com/company/lemon-exchange" target="_blank"><img alt="LinkedIn" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/linkedin2x_yleuxo.png" style="display: block; height: auto; border: 0;" title="LinkedIn" width="32"/></a></td>
                </tr>
                </table>
                </td>
                </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                <tr>
                <td style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
                <div style="font-family: sans-serif">
                <div style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                <p style="margin: 0; font-size: 14px; text-align: center;">&copy; ${yr}Lḕmoni Africa. All Rights Reserved</p>
                </div>
                </div>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                <tr>
                <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                <tbody>
                <tr>
                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                <table border="0" cellpadding="0" cellspacing="0" class="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tr>
                <td style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tr>
                <td style="vertical-align: middle; text-align: center;">
                <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                <!--[if !vml]><!-->
                <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
                <!--<![endif]-->
                <tr>
                </tr>
                </table>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table><!-- End -->
                
                
                </body>
                </html>`;
              let templateHtml = `<!DOCTYPE html>
          
                <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
                <head>
                <title></title>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
                <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
                <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                <style>
                    * {
                      box-sizing: border-box;
                    }
                
                    body {
                      margin: 0;
                      padding: 0;
                      background-color: rgb(6, 17, 6) ! important
                    }
                
                    a[x-apple-data-detectors] {
                      color: inherit !important;
                      text-decoration: inherit !important;
                    }
                
                    #MessageViewBody a {
                      color: inherit;
                      text-decoration: none;
                    }
                
                    p {
                      line-height: inherit
                    }
                
                    @media (max-width:720px) {
                      .icons-inner {
                        text-align: center;
                      }
                
                      .icons-inner td {
                        margin: 0 auto;
                      }
                
                      .row-content {
                        width: 100% !important;
                      }
                
                      .column .border {
                        display: none;
                      }
                
                      .stack .column {
                        width: 100%;
                        display: block;
                      }
                    }
                  </style>
                </head>
                <body style="background-color: #fbfbfb; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                  
                <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: background-color: rgb(6, 17, 6);" width="100%">
                <div style="position: fixed" id="particles-js"></div>
                <tbody>
                <tr>
                <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                <tr>
                <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                <tbody>
                <tr>
                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tr>
                <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:20px;padding-bottom:20px;">
                <div align="center" style="line-height:10px"><img alt="Alternate text" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647795552/lemoniafrica-l_1_preh1h.png" style="display: block; height: auto; border: 0; width: 140px; max-width: 100%;" title="Alternate text" width="140"/></div>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                <tr>
                <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f4f4; color: #000000; width: 700px;" width="700">
                <tbody>
                <tr>
                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                <tr>
                <td style="padding-bottom:25px;padding-left:25px;padding-right:10px;padding-top:30px;;background-color: #6a9a01">
                <div style="font-family: sans-serif">
                <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                <p style="margin: 0; font-size: 14px;"><span style="font-size:28px;color: white; padding-left: 10px">  Hi ${this.contactForm.value.recipientName}</span></p>
                </div>
                </div>
                </td>
                </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                <tr>
                <td style="padding-bottom:10px;padding-left:25px;padding-right:10px;padding-top:10px;background-color: #6a9a01">
                <div style="font-family: sans-serif">
                 <div style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  We are excited to have you on the Lemon Exchange waitlist and can’t wait </span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  to have you experience the delight of using our platform to buy, sell or </span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  store your cryptocurrencies with ease. <br /><br /></span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  An important piece that Lèmoni Africa brings is the human experience. We</span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  understand how complex Crypto trading can be and we always put our users</span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  first, so we came up with a platform that puts security at its core and</span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  requires little documentation for sign up. <br /><br /></span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  Simply click on the <a href="https://lemonexchange.africa/?referalCode=${referalCode}">Link</a> to get three friends on-board; you in turn get a no </span></p>
                    <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  charge status on transactions for 14 days.<br /><br /></span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  The Team at Lemon Exchange<br /></span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size:19px;;color: white">  <br /></span></p>
                      <p style="margin: 0; font-size: 18px; mso-line-height-alt: 18px;"> </p>
                      </div>
                </div>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                <tr>
                <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px;" width="700">
                <tbody>
                <tr>
                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tr>
                <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:55px;">
                <div align="center" style="line-height:10px"><img alt="I'm an image" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647795552/lemoniafrica-l_1_preh1h.png" style="display: block; height: auto; border: 0; width: 140px; max-width: 100%;" title="I'm an image" width="140"/></div>
                </td>
                </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="social_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tr>
                <td style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:35px;text-align:center;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="168px">
                <tr>
                <td style="padding:0 5px 0 5px;"><a href="https://twitter.com/lemoniafrica?s=21" target="_blank"><img alt="Twitter" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/twitter2x_fz9okn.png" style="display: block; height: auto; border: 0;" title="Twitter" width="32"/></a></td>
                <td style="padding:0 5px 0 5px;"><a href="https://instagram.com/lemoniafrica?utm_medium=copy_link" target="_blank"><img alt="Instagram" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/instagram2x_uhmcrr.png" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
                <td style="padding:0 5px 0 5px;"><a href="https://www.linkedin.com/company/lemon-exchange" target="_blank"><img alt="LinkedIn" height="32" src="https://res.cloudinary.com/dkjje7jd8/image/upload/v1647801112/linkedin2x_yleuxo.png" style="display: block; height: auto; border: 0;" title="LinkedIn" width="32"/></a></td>
                </tr>
                </table>
                </td>
                </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                <tr>
                <td style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
                <div style="font-family: sans-serif">
                <div style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                <p style="margin: 0; font-size: 14px; text-align: center;">&copy; ${yr}Lḕmoni Africa. All Rights Reserved</p>
                </div>
                </div>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                <tr>
                <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                <tbody>
                <tr>
                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                <table border="0" cellpadding="0" cellspacing="0" class="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tr>
                <td style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tr>
                <td style="vertical-align: middle; text-align: center;">
                <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                <!--[if !vml]><!-->
                <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
                <!--<![endif]-->
                <tr>
                </tr>
                </table>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table><!-- End -->
                
                
                </body>
                </html>`;

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
                  config.bcc,
                  this.contactForm.value.referredBy,
                  referalCode
                )
                .subscribe(
                  (res: any) => {
                    console.log(res);
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
          }
        },
        (error) => {
          this.referalCodeError = true;
        }
      );
    }
  }

  isFieldValid(field: any) {
    return (
      !this.contactForm.get(field)?.valid &&
      this.contactForm.get(field)?.touched
    );
  }
}

// let body: any = `<div>
// <img  src=https://res.cloudinary.com/dkjje7jd8/image/upload/v1646642485/lemon-exchange-logo-b_1_cz7pip-media_lib_thumb_tji1wq.png />
// </div>
// <br><br>
// Dear ${this.contactForm.value.recipientName},
// <br><br> We are excited to have you on the Lemon Exchange waitlist and we can't wait to have you experience the delight of using our platform to buy, sell or store your cryptocurrencies with ease.<br><br>
// Share the <a href="https://lemonexchange.africa">Link</a> to get your friends on the waitlist  <br><br> Best Regards <br> <br>
// The Team at Lemon Exchange
// <br> <br>
// <div >
// <img style="background-color:#ffc100" src=https://res.cloudinary.com/dkjje7jd8/image/upload/v1646641171/new_logo_wdzvtt-media_lib_thumb_tgohfl.png />
// </div>
// <br>
// <p>&copy; ${yr} Lḕmoni Africa. All Rights Reserved.</p>

// <div style="display:inline">
// <a href="https://twitter.com/lemoniafrica?s=21"> <img src=https://res.cloudinary.com/dkjje7jd8/image/upload/v1646598733/twitter_zpx2ao.png /></a>
// <a href="https://instagram.com/lemoniafrica?utm_medium=copy_link"> <img src=https://res.cloudinary.com/dkjje7jd8/image/upload/v1646598734/instagram_ckbojp.png /></a>
// <a href="https://www.linkedin.com/company/lemon-exchange"> <img src=https://res.cloudinary.com/dkjje7jd8/image/upload/v1646598733/linkedin_j4h5ie.png /></a>
// </div>
// `;
