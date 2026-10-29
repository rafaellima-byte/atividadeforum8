import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../app.js';

vi.mock('../prisma.js', () => ({
  prisma: {
    aluno: {
      findMany: vi.fn().mockResolvedValue([
        { id: '1', nome: 'João Vitor', email: 'joao@email.com', curso: 'Engenharia de Software' }
      ]),
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({
        id: '2',
        nome: 'Karla',
        email: 'karla@email.com',
        curso: 'Sistemas de Informação'
      })
    }
  }
}));

describe('Rotas de Alunos - Testes de Integração', () => {
  it('GET /alunos - Deve retornar status 200 e a lista de alunos', async () => {
    const response = await request(app).get('/alunos');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].nome).toBe('João Vitor');
  });

  it('POST /alunos - Deve criar um aluno com sucesso e retornar status 201', async () => {
    const novoAluno = {
      nome: 'Karla',
      email: 'karla@email.com',
      curso: 'Sistemas de Informação'
    };

    const response = await request(app).post('/alunos').send(novoAluno);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe('Karla');
  });
});
