export class AlunoService {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  async cadastrarAluno({ nome, email, curso }) {
    if (!nome || !email || !curso) {
      throw new Error('Todos os campos (nome, email, curso) são obrigatórios.');
    }

    const alunoExistente = await this.prisma.aluno.findUnique({
      where: { email }
    });

    if (alunoExistente) {
      throw new Error('E-mail já cadastrado.');
    }

    return await this.prisma.aluno.create({
      data: { nome, email, curso }
    });
  }

  async listarAlunos() {
    return await this.prisma.aluno.findMany();
  }
}
