export { Router };
class Router {
    static getPath() {
        return window.location.pathname;
    }
    static getParam(key) {
        const query = window.location.search.substr(1);
        const urlParams = new URLSearchParams(query);
        const param = urlParams.get(key);
        console.log(window.location);
        return param;
    }
}
