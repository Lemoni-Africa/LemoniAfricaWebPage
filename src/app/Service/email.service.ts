import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(
    senderName: any,
    senderEmail: any,
    recipientName: any,
    recipientEmail: any,
    recipientPhoneNumber: any,
    subject: any,
    body: any,
    htmlTemplate: any,
    client: any,
    bcc: any,
    referredBy: any,
    referralCode: any
  ) {
    return this.http.post(
      `${environment.emailUrl}/api/v1/Emails/SendEmailSendGrid/Html`,
      {
        senderName,
        senderEmail,
        recipientName,
        recipientEmail,
        recipientPhoneNumber,
        subject,
        body,
        htmlTemplate,
        client,
        bcc,
        referredBy,
        referralCode,
      }
    );
  }

  checkerReferalCode(code: any) {
    return this.http.get(
      `${environment.emailUrl}/api/v1/validate/referral-code/${code}`
    );
  }
}
