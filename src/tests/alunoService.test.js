import { describe, it, expect, vi } from 'vitest';
import { AlunoService } from '../services/alunoService.js';

describe('AlunoService - Testes Unitários', () => {
  it('Deve lançar um erro ao tentar cadastrar um aluno com e-mail duplicado', async () => {
    const mockPrisma = {
      aluno: {
        findUnique: vi.fn().mockResolvedValue({
          id: '1',
          nome: 'Rafael Silva',
          email: 'rafael@email.com',
          curso: 'Ciência da Computação'
        }),
        create: vi.fn()
      }
    };

    const alunoService = new AlunoService(mockPrisma);

    await expect(
      alunoService.cadastrarAluno({
        nome: 'Rafael Silva',
        email: 'rafael@email.com',
        curso: 'Ciência da Computação'
      })
    ).rejects.toThrow('E-mail já cadastrado.');

    expect(mockPrisma.aluno.findUnique).toHaveBeenCalledWith({
      where: { email: 'rafael@email.com' }
    });
  });
});
