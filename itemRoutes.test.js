process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app');
let cats = require('./fakeDb');

let popsicle = {
    name: 'popsicle',
    price: 1.45
};

beforeEach(() => {
    items.push(popsicle);
});

afterEach(() => {
    items.length = 0;
});

describe('GET /items', () => {
    test('Gets a list of items', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);

        expect(res.body).toEqual({items: [popsicle]});
    });
});

describe('GET /items/:name', () => {
    test('Gets a single item', async () => {
        const res = await request(app).get(`/items/${popsicle.name}`);
        expect(res.statusCode).toBe(200);

        expect(res.body).toEqual({item: popsicle});
    });

    test('Responds with 404 if cannot find item', async () => {
        const res = await request(app).get('/items/0');
        expect(res.statusCode).toBe(404);
    });
});

describe('POST /items', () => {
    test('Creates a new item', async () => {
        const res = await request(app)
        .post('/items')
        .send({
            name: 'chips',
            price: 1.00
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            added: {
                name: 'chips',
                price: 1.00
            }
        });
    });
});

describe('PATCH /items/:name', () => {
    test('Updates a single item', async () => {
        const res = await request(app)
        .patch(`/items/${popsicle.name}`)
        .send({
            name: 'milk',
            price: 2.25
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            updated: {
                name: 'milk',
                price: 2.25
            }
        });
    });

    test('Responds with 404 if item not found', async () => {
        const res = await request(app).patch('/items/0');
        expect(res.statusCode).toBe(404);
    });
});

describe('DELETE /items/:name', () => {
    test('Deletes a single item', async () => {
        const res = await request(app).delete(`/items/${popsicle.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Deleted'});
    });
});