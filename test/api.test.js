const request = require('supertest');
const app = require('../app');  // Import the express app

describe('POST /recommend', () => {
  it('should return recommendations for a valid user ID', async () => {
    const response = await request(app)
      .post('/api/recommend')
      .send({ user_id: 1 });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('recommendations');
  });

  it('should return a 400 error for missing user ID', async () => {
    const response = await request(app)
      .post('/api/recommend')
      .send({});
    
    expect(response.statusCode).toBe(400);
  });
});

describe('POST /feedback', () => {
  it('should save feedback and return a success message', async () => {
    const response = await request(app)
      .post('/api/feedback')
      .send({ user_id: 1, feedback: 'yes' });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Feedback received and saved');
  });

  it('should return a 400 error for missing fields', async () => {
    const response = await request(app)
      .post('/api/feedback')
      .send({ user_id: 1 });
    
    expect(response.statusCode).toBe(400);
  });
});
