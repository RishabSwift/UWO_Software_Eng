import { Component, OnInit } from '@angular/core';
import {PagesService} from "../services/pages.service";

@Component({
  selector: 'app-admin-aup-policy',
  templateUrl: './admin-aup-policy.component.html',
  styleUrls: ['./admin-aup-policy.component.scss']
})
export class AdminAupPolicyComponent implements OnInit {

  allPages: any;
  page: string;
  aupText: any;

  constructor(public pageService: PagesService) {
  }

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages = () => this.pageService.getPagesList().subscribe(res => {
    this.allPages = res.map(item => {
      return {
        $id: item.payload.doc.id,
        ...item.payload.doc.data()
      };
    });

    this.page = this.allPages.filter(item => item.name === "aup-policy")[0];
    // @ts-ignore
    this.aupText = this.page.text;
  });


  saveAupPolicy() {
    this.pageService.updatePage(this.page, this.aupText);
    window.alert('Changes saved!');
  }
}
