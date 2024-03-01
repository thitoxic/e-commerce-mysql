const request = require('supertest');
const app = require('../index');

describe('API Endpoint Tests', () => {
  let token;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword'
      });
    token = loginResponse.body.token;
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          password: 'password123',
          isAdmin: false
        });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created!');
    });

  });

  describe('POST /login', () => {
    it('should login with correct credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'testuser@example.com',
          password: 'testpassword'
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('message', 'Logged in successfully!');
    });
  });

  describe('GET /list', () => {
    it('should return 401 if not authenticated', async () => {
      const response = await request(app)
        .get('/list');
      expect(response.status).toBe(401);
    });

    it('should return product list if authenticated', async () => {
      const response = await request(app)
        .get('/list')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
