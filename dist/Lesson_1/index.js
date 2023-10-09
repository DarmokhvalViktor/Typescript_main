console.log("test2");
class UserService {
    static _getAll() {
        return JSON.parse(localStorage.getItem(this._usersKey)) || [
            { id: 1, name: "Max", age: 5 }
        ];
    }
    static create(data) {
        const users = this._getAll();
        const id = users.length ? users.slice(-1)[0].id + 1 : 1;
        users.push({ id, ...data });
        this._setToStorage(users);
    }
    static deleteById(id) {
        const users = this._getAll();
        const index = users.findIndex(user => user.id === id);
        users.splice(index, 1);
        this._setToStorage(users);
    }
    static render() {
        const userContainer = document.getElementById("userContainer");
        userContainer.innerHTML = "";
        const users = this._getAll();
        const usersHTMLContent = users.map(user => {
            const itemDiv = document.createElement("div");
            const button = document.createElement("button");
            button.innerText = "delete";
            button.addEventListener("click", () => {
                this.deleteById(user.id);
            });
            itemDiv.innerText = `${user.id} ${user.name} -- ${user.age}`;
            itemDiv.appendChild(button);
            return itemDiv;
        });
        if (usersHTMLContent.length) {
            userContainer.append(...usersHTMLContent);
        }
        else {
            userContainer.innerText = "Users not exists";
        }
    }
    static _setToStorage(data) {
        localStorage.setItem(this._usersKey, JSON.stringify(data));
        this.render();
    }
}
UserService._usersKey = 'users';
UserService.render();
const form = document.forms.namedItem("userForm");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { name: { value: name }, age: { value: age } } = form;
    UserService.create({ name, age: +age });
    form.reset();
});
//# sourceMappingURL=index.js.map