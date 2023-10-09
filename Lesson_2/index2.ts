// function asd(){
//     const a = 5
//     return a
//     console.log('!!!!!!!!!!!!!!!!1');
// }
//
// console.log(asd());
//
// function* asd(){
// const a = 5
// yield a
// console.log('!!!!!!!!!!!!!!!!1');
// }
//
// const gen = asd();
//
// const next = gen.next();
// console.log(next);
// const next2 = gen.next();
// console.log(next2);
//
//
// function* asd(){
//     yield 1
//     yield 2
//     yield 3
// }
//
// const gen = asd();
//
// console.log(gen.next());
// console.log('hello');
// console.log(gen.next());
// // sdfsdf
// console.log(gen.next());
//
// console.log(gen.next());
//
//
// function* genFileNames():Generator<string>{
//     let index = 0
//     while (true){
//         yield `file${index++}.jpg`
//     }
// }
//
// const fileGen = genFileNames();
//
//
// console.log(fileGen.next().value);
// console.log(fileGen.next().value);
// console.log('hello world');
// console.log(fileGen.next().value);
//
//
// function* team1(n:number):Generator<string>{
//     for (let i = 1; i <= n; i++) {
//         yield `team1 -- worker ${i}`
//     }
// }
//
// function* team2(n:number):Generator<string>{
//     for (let i = 1; i <= n; i++) {
//         yield `team2 -- worker ${i}`
//     }
// }
//
// const teams = [team1(15), team2(28)]
// console.log(teams);
//
//
// while (teams.length){
//     const team = teams.shift();
//     const next = team.next();
//
//     if (next.done){
//         continue
//     }
//
//     console.log(next.value);
//     teams.push(team)
// }
//
//
// // const arr =[
// //     // [1,2,3],
// //     [4,5,6,8],
// //     // [7,3]
// // ]
// //
// // [1,4,5,2,5,3,3,6,8]
//
//

interface IUser2 {
    id: number;
    name: string;
    username: string;
    email: string;
}

const getAllUsers = ():Promise<IUser2[]> =>fetch('https://jsonplaceholder.typicode.com/users').then(value => value.json())


const main = async ()=>{
    const a = 'dddddd'
    const users = await getAllUsers();
    const userContainerDiv = document.querySelector<HTMLDivElement>('#userContainer');
    users.forEach(user=>{
        const userItem = document.createElement('div');
        userItem.innerText = `${user.id}) ${user.name} -- ${user.email}`
        const button = document.createElement('button');
        button.innerText ='Posts'
        button.onclick =()=>{
            location.href = `./posts.html?userId=${user.id}`
        }
        userItem.appendChild(button)
        userContainerDiv.appendChild(userItem)
    })
}

main()




const baseURL = 'http://owu.linkpc.net/carsAPI/v1'

const cars = `${baseURL}/cars`

const urls = {
    cars: {
        base: cars,
        byId: (id: number): string => `${cars}/${id}`
    }
}

interface ICar {
    id?: number;
    brand: string;
    price: number;
    year: number;
}

const carService = {
    getAll: (): Promise<ICar[]> => fetch(urls.cars.base).then(value => value.json()),
    create: (data: ICar): Promise<ICar> => fetch(urls.cars.base, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json'}
    }).then(value => value.json()),
    deleteById: (id: number): Promise<Response> => fetch(urls.cars.byId(id), {method: 'DELETE'})
}


class CarHtmlRender {
    static async showAll(): Promise<void> {
        this.formAction()
        const cars = await carService.getAll();
        const carContainerDiv = document.querySelector<HTMLDivElement>('#carContainer');
        carContainerDiv.innerHTML = ''
        cars.forEach(car => {
            const itemDiv = document.createElement('div');
            itemDiv.innerText = `${car.id}) ${car.brand} ${car.price} ${car.year}`
            const button = document.createElement('button');
            button.innerText = 'delete'
            button.onclick = async () => {
                await carService.deleteById(car.id)
                await this.showAll()
            }
            itemDiv.appendChild(button)
            carContainerDiv.appendChild(itemDiv)
        })
    }

    private static formAction(): void {
        const form = document.forms.namedItem('carForm');
        form.onsubmit = async (e: SubmitEvent): Promise<void> => {
            e.preventDefault()
            const {brand, price, year} = form as any as Record<'brand' | 'price' | 'year', HTMLInputElement>;
            const car: ICar = {brand: brand.value, price: +price.value, year: +year.value}
            await carService.create(car)
            await this.showAll()
            form.reset()
        }
    }
}

// const carHtmlRender = new CarHtmlRender();

CarHtmlRender.showAll()
