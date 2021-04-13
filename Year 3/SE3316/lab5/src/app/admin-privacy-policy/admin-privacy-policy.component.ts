import {Component, OnInit} from '@angular/core';
import {PagesService} from "../services/pages.service";

@Component({
    selector: 'app-admin-privacy-policy',
    templateUrl: './admin-privacy-policy.component.html',
    styleUrls: ['./admin-privacy-policy.component.scss']
})
export class AdminPrivacyPolicyComponent implements OnInit {


    allPages: any;
    page: string;
    privacyText: any;

    constructor(public pageService: PagesService) {
    }

    ngOnInit(): void {
        this.loadPages();
    }

    loadPages = () => this.pageService.getPagesList().subscribe(res => {
        this.allPages = res.map(item => {
            return {
                $id: item.payload.doc.id,
                // @ts-ignore
                ...item.payload.doc.data()
            };
        });

        this.page = this.allPages.filter(item => item.name === "privacy-policy")[0];
        // @ts-ignore
        this.privacyText = this.page.text;
    });


    savePrivacyPolicy() {
        this.pageService.updatePage(this.page, this.privacyText);
        window.alert('Changes saved!');
    }
}
