export { Form };
var Form = /** @class */ (function () {
    function Form(fields) {
        this.fields = fields;
    }
    Form.prototype.render = function (parent) {
        var _this = this;
        var formElement = document.createElement("form");
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            field.render(formElement);
        }
        var button = document.createElement("button");
        button.type = "submit";
        button.innerHTML = "Wyślij";
        button.addEventListener("click", function (e) {
            console.log(_this.getValue());
            e.preventDefault();
        });
        formElement.appendChild(button);
        parent.appendChild(formElement);
    };
    Form.prototype.getValue = function () {
        var resultValues = {};
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            resultValues[field.type + "_" + field.name] = field.getValue();
        }
        return resultValues;
    };
    return Form;
}());
