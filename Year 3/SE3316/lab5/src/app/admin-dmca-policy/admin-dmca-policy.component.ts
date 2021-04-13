import {Component, OnInit} from '@angular/core';
import {PagesService} from "../services/pages.service";

@Component({
    selector: 'app-admin-dmca-policy',
    templateUrl: './admin-dmca-policy.component.html',
    styleUrls: ['./admin-dmca-policy.component.scss']
})
export class AdminDmcaPolicyComponent implements OnInit {

    allPages: any;
    page: string;
    dmcaText: any;

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

        this.page = this.allPages.filter(item => item.name === "dmca-policy")[0];
        // @ts-ignore
        this.dmcaText = this.page.text;
    });


    saveDmcaPolicy() {
        this.pageService.updatePage(this.page, this.dmcaText);
        window.alert('Changes saved!');
    }

}
