import {test as base, Fixtures} from "@playwright/test";
import LoginPage from "../tests/ui/automation_exercise-app/pages/login";

type MyFixture = {

    loginPage: LoginPage;

}

export const test = base.extend<MyFixture>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    }

})