import {Component, OnInit} from '@angular/core';
import {PagesService} from "../services/pages.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-policy-pages',
    templateUrl: './policy-pages.component.html',
    styleUrls: ['./policy-pages.component.scss']
})
export class PolicyPagesComponent implements OnInit {

    allPages: any;
    activePage: any;
    slug: string;
    title: string;

    constructor(public pageService: PagesService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.slug = params.page;
            this.loadPages();
        });
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

        this.activePage = this.allPages.filter(item => item.name === this.slug)[0];
        if (this.activePage) {
            switch (this.slug) {
                case 'privacy-policy':
                    this.title = "Privacy Policy";
                    break;
                case 'dmca-policy':
                    this.title = "DMCA Policy";
                    break;
                case 'aup-policy':
                    this.title = "AUC Policy";
                    break;
            }
        }
    });


}
