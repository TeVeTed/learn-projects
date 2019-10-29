import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill';
import ReflectionWithJsObject from './src/usingJSObject/controllers/Reflection';
import ReflectionWithDB from './src/usingDB/controllers/Reflection';
import UserWithDb from './src/usingDB/controllers/User';
import Auth from './src/usingDB/middleware/Auth';

dotenv.config();
const Reflection = process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJsObject;
const app = express();

app.use(express.json());

const start = (req, res) => res.status(200).send({ 'message': 'SUCCESS' });

app.get('/', start);
app.post('/api/v1/reflections', Auth.verifyToken, Reflection.create);
app.get('/api/v1/reflections', Auth.verifyToken, Reflection.getAll);
app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getOne);
app.put('/api/v1/reflections/:id', Auth.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id', Auth.verifyToken, Reflection.delete);
app.get('/api/v1/users', UserWithDb.getAll);
app.post('/api/v1/users', UserWithDb.create);
app.post('/api/v1/users/login', UserWithDb.login );
app.delete('/api/v1/users/me', Auth.verifyToken, UserWithDb.delete);

app.listen(3000);
console.log('app running on port ', 3000);