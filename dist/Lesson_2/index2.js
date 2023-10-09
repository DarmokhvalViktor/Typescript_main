const getAllUsers = () => fetch('https://jsonplaceholder.typicode.com/users').then(value => value.json());
const main = async () => {
    const a = 'dddddd';
    const users = await getAllUsers();
    const userContainerDiv = document.querySelector('#userContainer');
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.innerText = `${user.id}) ${user.name} -- ${user.email}`;
        const button = document.createElement('button');
        button.innerText = 'Posts';
        button.onclick = () => {
            location.href = `./posts.html?userId=${user.id}`;
        };
        userItem.appendChild(button);
        userContainerDiv.appendChild(userItem);
    });
};
main();
const baseURL = 'http://owu.linkpc.net/carsAPI/v1';
const cars = `${baseURL}/cars`;
const urls = {
    cars: {
        base: cars,
        byId: (id) => `${cars}/${id}`
    }
};
const carService = {
    getAll: () => fetch(urls.cars.base).then(value => value.json()),
    create: (data) => fetch(urls.cars.base, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
    }).then(value => value.json()),
    deleteById: (id) => fetch(urls.cars.byId(id), { method: 'DELETE' })
};
class CarHtmlRender {
    static async showAll() {
        this.formAction();
        const cars = await carService.getAll();
        const carContainerDiv = document.querySelector('#carContainer');
        carContainerDiv.innerHTML = '';
        cars.forEach(car => {
            const itemDiv = document.createElement('div');
            itemDiv.innerText = `${car.id}) ${car.brand} ${car.price} ${car.year}`;
            const button = document.createElement('button');
            button.innerText = 'delete';
            button.onclick = async () => {
                await carService.deleteById(car.id);
                await this.showAll();
            };
            itemDiv.appendChild(button);
            carContainerDiv.appendChild(itemDiv);
        });
    }
    static formAction() {
        const form = document.forms.namedItem('carForm');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const { brand, price, year } = form;
            const car = { brand: brand.value, price: +price.value, year: +year.value };
            await carService.create(car);
            await this.showAll();
            form.reset();
        };
    }
}
CarHtmlRender.showAll();
//# sourceMappingURL=index2.js.map