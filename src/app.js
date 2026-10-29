import express from 'express';
import { prisma } from './prisma.js';
import { AlunoService } from './services/alunoService.js';

const app = express();
app.use(express.json());

const alunoService = new AlunoService(prisma);

app.get('/alunos', async (req, res) => {
  try {
    const alunos = await alunoService.listarAlunos();
    return res.status(200).json(alunos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/alunos', async (req, res) => {
  try {
    const aluno = await alunoService.cadastrarAluno(req.body);
    return res.status(201).json(aluno);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default app;
