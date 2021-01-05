import supertest from 'supertest';
import { app } from '../src/server';

const server = () => supertest(app);

const user =  {
  name: "franka ang",
  email: "franka@me.com",
  password: "123456"
}

const postData = {
  name: "new post",
  body: "long text for new post again"
}

describe('POST', () => {
  it('should be able to add new post', async () => {
    const { body } = await server().post('/api/v1/register').send(user);
    const { status: pStatus, body: pBody } = await server().post('/api/v1/post').send(postData)
    .set({
      authorization: `Bearer ${body.token}`
    });
    expect(pStatus).toBe(201);
    const postBodyKeys = ['status','success', 'data'];
    expect(Object.keys(pBody)).toEqual(postBodyKeys);
    const dataKeys = ['id', 'name', 'email'];
    expect(Object.keys(body.data)).toEqual(dataKeys);
  });

  it('should be able to get and delete a post', async () => {
    const { body } = await server().post('/api/v1/register').send(user);
    const { body: pBody } = await server().post('/api/v1/post').send(postData)
    .set({
      authorization: `Bearer ${body.token}`
    });
    const {status, body: getBody } = await server().get(`/api/v1/post/${pBody.data.id}`)
    .set({
      authorization: `Bearer ${body.token}`
    });
    const {status: delStatus, body: delBody } = await server().delete(`/api/v1/post/${getBody.data.id}`)
    .set({
      authorization: `Bearer ${body.token}`
    });
    expect(delStatus).toBe(200);
    expect(delBody.message).toEqual('post deleted successfully');

    const {status: newGetStatus, body: newgetBody } = await server().get(`/api/v1/post/${pBody.data.id}`)
    .set({
      authorization: `Bearer ${body.token}`
    });
    expect(newGetStatus).toBe(404);
    expect(newgetBody.message).toEqual('Not found');
    
    const postBodyKeys = ['status','success', 'data'];
    expect(Object.keys(pBody)).toEqual(postBodyKeys);
  });

  it('should be able to update a post', async () => {
    const { body } = await server().post('/api/v1/register').send(user);
    const { body: pBody } = await server().post('/api/v1/post').send(postData)
    .set({
      authorization: `Bearer ${body.token}`
    });
    const updatedPostData = {
      name: 'updated name',
      body: 'updated body',
    }
    const {status, body: updateBodyR } = await server().put(`/api/v1/post/${pBody.data.id}`).send({
      ...updatedPostData
    })
    .set({
      authorization: `Bearer ${body.token}`
    });
    expect(status).toBe(201);
    expect(updateBodyR.data.name).toEqual(updatedPostData.name);
    expect(updateBodyR.data.body).toEqual(updatedPostData.body);
    const postBodyKeys = ['status','success', 'data'];
    expect(Object.keys(pBody)).toEqual(postBodyKeys);
  });

});
