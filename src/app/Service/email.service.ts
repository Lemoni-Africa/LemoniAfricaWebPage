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
    bcc: any
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
      }
    );
  }

  // verifyVotersCard(ref: any, firstName: any, lastName: any, dob: any) {
  //   return this.http.post(
  //     `${environment.verifyMeUrl}/api/v1/verifyme/voters-card2`,
  //     { ref, firstName, lastName, dob },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.token}`,
  //       },
  //     }
  //   );
  // }
}

// {
//   "senderName": "Lemon Exchange",
//   "senderEmail": "info@lemonexchange.africa",
//   "recipientName": "Test",
//   "recipientEmail": "me@u.com",
//   recipientPhoneNumber": "me@u.com",
//   "subject": "Wait List Onboarning",
//   "body": "Dear Test, <br><br> Your loan application have been submitted successfully. We will review and get back to you. <br> Thank you.",
//   "htmlTemplate": "Dear Test, <br><br> Your loan application have been submitted successfully. We will review and get back to you. <br> Thank you.",
//   "client": "Lex",
//   "attachments": [
//     {
//       "base64EncodedSTring": "string",
//       "filename": "string"
//     }
//   ],
//   "bcc": "info@lemonexchange.africa"
// }
