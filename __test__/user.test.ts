import supertest from 'supertest';
import { app } from '../src/server';

const server = () => supertest(app);

const user =  {
  name: "franka ang",
  email: "franka@me.com",
  password: "123456"
}

describe('User', () => {
  it('should create a new user', async () => {
    const { status, body } = await server().post('/api/v1/register').send(user);
    expect(status).toBe(200);
    expect(body.status).toBe(200);
    const bodyKeys = ['success', 'status', 'data', 'token'];
    expect(Object.keys(body)).toEqual(bodyKeys);
    const dataKeys = ['id', 'name', 'email'];
    expect(Object.keys(body.data)).toEqual(dataKeys);
  });

  it('should throw error if user already exist', async () => {
    await server().post('/api/v1/register').send(user);
    const { status, body } = await server().post('/api/v1/register').send(user);
    expect(status).toBe(500);
    expect(body.status).toBe(500);
    const bodyKeys = ['success', 'status', 'error'];
    expect(Object.keys(body)).toEqual(bodyKeys);
  });

  it('should return validtion error if some body params are missing', async () => {
    
    const { status, body } = await server().post('/api/v1/register').send({
      name: user.name,
      email: user.email
    });
    expect(status).toBe(400);
    expect(body).toMatchSnapshot();
  });

  it('user can login', async () => {

    await server().post('/api/v1/register').send(user);
    const { status, body } = await server().post('/api/v1/login').send({
      email: user.email,
      password: user.password
    });
    expect(status).toBe(200);
    const bodyKeys = ['success', 'status', 'data', 'token'];
    expect(Object.keys(body)).toEqual(bodyKeys);
    const dataKeys = ['id', 'name', 'email'];
    expect(Object.keys(body.data)).toEqual(dataKeys);
  });

});
