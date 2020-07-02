import { LocStorage } from "./storage.js";
export { FormList };

class FormList {
    list: string[] = [];
    private locStorage = new LocStorage();

    getFormList(): void {
        this.list = this.locStorage.getForms();
    }

    getForm(formId: string): any {
        return this.locStorage.loadForm(formId);
    }

    removeForm(formId: string): void {
        this.locStorage.removeForm(formId);
    }
}