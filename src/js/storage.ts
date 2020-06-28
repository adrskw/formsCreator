export { LocStorage }

interface IStorage {
    saveDocument(formValues : any) : string,
    removeDocument(documentId: string): void, 
    loadDocument(documentId : string) : any,
    getDocuments() : string[]
}

class LocStorage implements IStorage {
    saveDocument(formValues: any, id: string = ""): string {
        let documentId : string = id;

        if (id === "") {
            documentId = "document-" + Date.now();
        }
        
        this.addDocumentIdToDocumentsList(documentId);

        localStorage.setItem(documentId, JSON.stringify(formValues));

        return documentId;
    }

    removeDocument(documentId: string): void {
        localStorage.removeItem(documentId);

        const documentsList = localStorage.getItem("documentsList");
        let documents : string[] = [];

        if (documentsList !== null) {
            documents = JSON.parse(documentsList);
        }

        const index = documents.indexOf(documentId);
        if (index !== -1) {
            documents.splice(index, 1);
        }

        localStorage.setItem("documentsList", JSON.stringify(documents));
    }

    loadDocument(documentId: string): any {
        const doc = JSON.parse(localStorage.getItem(documentId)!);

        return doc;
    }

    getDocuments(): string[] {
        const documentsListJson = localStorage.getItem("documentsList");
        let documentsList : string[] = [];
 
        if (documentsListJson !== null) {
            documentsList = JSON.parse(documentsListJson);
        }

        return documentsList;
    }

    private addDocumentIdToDocumentsList(documentId : string) : void {
        const documentsList = localStorage.getItem("documentsList");
        let documents : string[] = [];

        if (documentsList !== null) {
            documents = JSON.parse(documentsList);
        }

        if(documents.indexOf(documentId) === -1) {
            documents.push(documentId);
        }

        localStorage.setItem("documentsList", JSON.stringify(documents));
    }

    saveForm(formValues: any, id: string = ""): string {
        let formId: string = id;

        if (id === "") {
            formId = "form-" + Date.now();
        }
        
        this.addFormIdToFormsList(formId);

        localStorage.setItem(formId, JSON.stringify(formValues));

        return formId;
    }

    removeForm(formId: string): void {
        localStorage.removeItem(formId);

        const formsList = localStorage.getItem("formsList");
        let forms: string[] = [];

        if (formsList !== null) {
            forms = JSON.parse(formsList);
        }

        const index = forms.indexOf(formId);
        if (index !== -1) {
            forms.splice(index, 1);
        }

        localStorage.setItem("formsList", JSON.stringify(forms));
    }

    loadForm(formId: string): any {
        const form = JSON.parse(localStorage.getItem(formId)!);

        return form;
    }

    getForms(): string[] {
        const formsList = localStorage.getItem("formsList");
        let forms: string[] = [];
 
        if (formsList !== null) {
            forms = JSON.parse(formsList);
        }

        return forms;
    }

    private addFormIdToFormsList(formId: string): void {
        const formsList = localStorage.getItem("formsList");
        let forms: string[] = [];

        if (formsList !== null) {
            forms = JSON.parse(formsList);
        }

        if(forms.indexOf(formId) === -1) {
            forms.push(formId);
        }

        localStorage.setItem("formsList", JSON.stringify(forms));
    }
}