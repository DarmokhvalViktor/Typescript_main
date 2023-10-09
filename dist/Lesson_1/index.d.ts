interface IUser {
    id: number;
    name: string;
    age: number;
}
type IUserForm = Pick<IUser, "name" | "age">;
declare class UserService {
    private static readonly _usersKey;
    private static _getAll;
    static create(data: IUserForm): void;
    static deleteById(id: number): void;
    static render(): void;
    private static _setToStorage;
}
declare const form: HTMLFormElement;
