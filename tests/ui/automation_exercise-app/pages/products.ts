import { Expect, Locator, Page } from "@playwright/test";


export default class ProductPage{

    readonly page: Page;


    readonly blueTop: Locator;

    constructor(page:Page){
        this.page = page;

        this.blueTop = page.getByRole('link', {name: 'name'});
    }

}