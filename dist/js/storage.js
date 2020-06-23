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
}
