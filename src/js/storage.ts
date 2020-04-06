interface IStorage {
    saveDocument(formValues : {[key: string]: string}) : string,
    loadDocument(documentId : string) : {[key: string]: string},
    getDocuments() : string[]
}
