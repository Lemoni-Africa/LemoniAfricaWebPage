import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],
})
export class CareerComponent implements OnInit {
  openBtn1!: boolean;
  openBtn2!: boolean;
  openBtn3!: boolean;
  openBtn4!: boolean;
  openBtn5!: boolean;
  openBtn6!: boolean;
  openBtn7!: boolean;
  openBtn8!: boolean;
  openBtn9!: boolean;
  openBtn10!: boolean;
  array = [
    // 'At Lèmoni, we believe that everyone has a right to growth, and we are committed to help people make wealth. We encourage our people to take smart risks and welcome possible failures. This has enabled us to build a world-class platform that simplifies complex digital asset management services. Our people keep in mind what’s important: that even the littlest of investments can make a huge difference. This notion is evidently rooted in our product offerings, embedded in our culture and it empowers us to take a critical view of the "norms"',
    'There is no inner circle. Everyone from the c-suite to interns share knowledge, information, and ideas. This is because transparency makes everyone think like founders and stay focused on our VIPs – our customers.',
    'Everyone is challenged to own their jobs as every one’s input directly impacts the business, that way we learn faster.',
    'We believe there is strength in diversity, this makes us committed to building a diverse and inclusive environment',
    'We recognize our employees as people not items, so we enforce our work-life balance policies',
    'We believe that personal and professional growth is as important as business growth, and we are committed to grooming our people to be the best version of themselves',
  ];
  constructor() {}

  ngOnInit(): void {}

  openFaq(el: any) {
    const myElement: any = document.getElementById(el);
    if (el === 'collapseTwo') {
      this.openBtn1 = !this.openBtn1;
    }
    if (el === 'collapseThree') {
      this.openBtn2 = !this.openBtn2;
    }
    if (el === 'collapseFour') {
      this.openBtn3 = !this.openBtn3;
    }
    if (el === 'collapseOne') {
      this.openBtn4 = !this.openBtn4;
    }
    if (el === 'collapseFive') {
      this.openBtn5 = !this.openBtn5;
    }
    if (el === 'collapseSix') {
      this.openBtn6 = !this.openBtn6;
    }
    if (el === 'collapseSeven') {
      this.openBtn7 = !this.openBtn7;
    }
    // if (el === 'collapseTwo') {
    //   this.openBtn1 = !this.openBtn1;
    // }
    // if (el === 'collapseTwo') {
    //   this.openBtn1 = !this.openBtn1;
    // }
  }
}
