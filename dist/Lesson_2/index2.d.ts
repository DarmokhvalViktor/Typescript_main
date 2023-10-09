interface IUser2 {
    id: number;
    name: string;
    username: string;
    email: string;
}
declare const getAllUsers: () => Promise<IUser2[]>;
declare const main: () => Promise<void>;
declare const baseURL = "http://owu.linkpc.net/carsAPI/v1";
declare const cars = "http://owu.linkpc.net/carsAPI/v1/cars";
declare const urls: {
    cars: {
        base: string;
        byId: (id: number) => string;
    };
};
interface ICar {
    id?: number;
    brand: string;
    price: number;
    year: number;
}
declare const carService: {
    getAll: () => Promise<ICar[]>;
    create: (data: ICar) => Promise<ICar>;
    deleteById: (id: number) => Promise<Response>;
};
declare class CarHtmlRender {
    static showAll(): Promise<void>;
    private static formAction;
}
