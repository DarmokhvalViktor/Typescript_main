// console.log("hello from ts");
// console.log("Hello #2")
// console.log("Hello #3")
// console.log("Hello #4")
//
// interface IUser<T> {
//     id?: number;
//     name: string;
//     age: number;
//     work: T[];
// }
//
// const user: IUser<number> = {id: 1, name: "Max", age: 5, work: [1, 2, 3, 4, 5]};
// const user2: IUser<string> = {id: 1, name: "Max", age: 5, work: ['1', '2', '3', '4', '5']};
// const user3: Partial<IUser<string>> = {id: 1, name: "Max"};
console.log("test2")
interface IUser {
    id: number;
    name: string;
    age: number;
}

type IUserForm = Pick<IUser, "name" | "age">

class UserService {
    private static readonly _usersKey = 'users';

    // constructor(private name: string) {
    // }

    private static _getAll():IUser[] {
        return JSON.parse(localStorage.getItem(this._usersKey)) || [
            {id: 1, name: "Max", age: 5}
        ]
    }

    // getName():string {
    //     return this.name;
    // }

    static create(data:IUserForm):void {
        const users = this._getAll();
        const id = users.length ? users.slice(-1)[0].id + 1 : 1;
        users.push({id, ...data});
        this._setToStorage(users);
    }

    static deleteById(id:number):void {
        const users = this._getAll();
        const index = users.findIndex(user => user.id === id);
        users.splice(index, 1);
        this._setToStorage(users);
    }

    static render():void {
        const userContainer = document.getElementById("userContainer") as HTMLDivElement;
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
        })

        if(usersHTMLContent.length) {
            userContainer.append(...usersHTMLContent);
        } else {
            userContainer.innerText = "Users not exists";
        }
    }

    private static _setToStorage(data:IUser[]):void {
        localStorage.setItem(this._usersKey, JSON.stringify(data));
        this.render();
    }

}
// const user = new UserService("ivan");
// console.log(user.getName())

UserService.render();

// interface IInputs {
//     name: HTMLInputElement;
//     age: HTMLInputElement;
// }

const form = document.forms.namedItem("userForm") as HTMLFormElement;

form.addEventListener("submit", (event:SubmitEvent) => {
    event.preventDefault();
    // const {name, age} = form as any as IInputs;
    const {name:{value:name}, age:{value:age}} = form as any as Record <keyof IUserForm, HTMLInputElement>;
    UserService.create({name, age:+age});
    form.reset();
})
