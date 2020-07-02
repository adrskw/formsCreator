import { LocStorage } from "./storage.js";
export { FormList };
class FormList {
    constructor() {
        this.list = [];
        this.locStorage = new LocStorage();
    }
    getFormList() {
        this.list = this.locStorage.getForms();
    }
    getForm(formId) {
        return this.locStorage.loadForm(formId);
    }
    removeForm(formId) {
        this.locStorage.removeForm(formId);
    }
}
