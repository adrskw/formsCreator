import { Field } from './fields';
export { Form };

class Form {
    private fields: Field[];
    
    constructor(fields: Field[]) {
        this.fields = fields;
    }

    render(parent: HTMLElement): void {
        const formElement = document.createElement("form");

        for (const field of this.fields) {
            // wrap field with div
            const div = document.createElement("div");
            div.className = "form-element";

            field.render(div);

            formElement.appendChild(div);
        }

        const button = document.createElement("button");
        button.type = "submit";
        button.innerHTML = "Wyślij"
        button.addEventListener("click", (e) => {
            console.log(this.getValue());
            e.preventDefault();
        });
        formElement.appendChild(button);

        parent.appendChild(formElement);
    }

    getValue(): {[key: string]: string}{
        let resultValues: {[key: string]: string} = {};
        
        for (const field of this.fields) {
            resultValues[field.type + "_" + field.name] = field.getValue(); 
        }

        return resultValues;
    }
}