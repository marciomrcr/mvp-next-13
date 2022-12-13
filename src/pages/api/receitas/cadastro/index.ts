import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const id = req.query.id;
      try {
        const receita = await prisma.income.findFirst({
          where: {
            id: id as string,
          },
          select: {
            title: true,
            description: true,
          },
        });
        if (id) return res.json(`A receita: ${receita?.title} foi apagada!`);
      } catch (error: any) {
        return res.status(404).json({ message: 'Receita não encontrada' });
      }

    case 'POST':
      const { title, description } = req.body;

      try {
        await prisma.income.create({
          data: {
            title,
            description,
          },
        });
        res.status(201).json({ Mensagem: 'Receita salva com sucesso' });
      } catch (error) {
        console.log('Falha ao salvar a receita');
      }
  }
};
