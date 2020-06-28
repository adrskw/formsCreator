export { LocStorage };
class LocStorage {
    saveDocument(formValues, id = "") {
        let documentId = id;
        if (id === "") {
            documentId = "document-" + Date.now();
        }
        this.addDocumentIdToDocumentsList(documentId);
        localStorage.setItem(documentId, JSON.stringify(formValues));
        return documentId;
    }
    removeDocument(documentId) {
        localStorage.removeItem(documentId);
        const documentsList = localStorage.getItem("documentsList");
        let documents = [];
        if (documentsList !== null) {
            documents = JSON.parse(documentsList);
        }
        const index = documents.indexOf(documentId);
        if (index !== -1) {
            documents.splice(index, 1);
        }
        localStorage.setItem("documentsList", JSON.stringify(documents));
    }
    loadDocument(documentId) {
        const doc = JSON.parse(localStorage.getItem(documentId));
        return doc;
    }
    getDocuments() {
        const documentsListJson = localStorage.getItem("documentsList");
        let documentsList = [];
        if (documentsListJson !== null) {
            documentsList = JSON.parse(documentsListJson);
        }
        return documentsList;
    }
    addDocumentIdToDocumentsList(documentId) {
        const documentsList = localStorage.getItem("documentsList");
        let documents = [];
        if (documentsList !== null) {
            documents = JSON.parse(documentsList);
        }
        if (documents.indexOf(documentId) === -1) {
            documents.push(documentId);
        }
        localStorage.setItem("documentsList", JSON.stringify(documents));
    }
    saveForm(formValues, id = "") {
        let formId = id;
        if (id === "") {
            formId = "form-" + Date.now();
        }
        this.addFormIdToFormsList(formId);
        localStorage.setItem(formId, JSON.stringify(formValues));
        return formId;
    }
    removeForm(formId) {
        localStorage.removeItem(formId);
        const formsList = localStorage.getItem("formsList");
        let forms = [];
        if (formsList !== null) {
            forms = JSON.parse(formsList);
        }
        const index = forms.indexOf(formId);
        if (index !== -1) {
            forms.splice(index, 1);
        }
        localStorage.setItem("formsList", JSON.stringify(forms));
    }
    loadForm(formId) {
        const form = JSON.parse(localStorage.getItem(formId));
        return form;
    }
    getForms() {
        const formsList = localStorage.getItem("formsList");
        let forms = [];
        if (formsList !== null) {
            forms = JSON.parse(formsList);
        }
        return forms;
    }
    addFormIdToFormsList(formId) {
        const formsList = localStorage.getItem("formsList");
        let forms = [];
        if (formsList !== null) {
            forms = JSON.parse(formsList);
        }
        if (forms.indexOf(formId) === -1) {
            forms.push(formId);
        }
        localStorage.setItem("formsList", JSON.stringify(forms));
    }
}
