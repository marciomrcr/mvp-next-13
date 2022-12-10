import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'PUT':
      const { title, description } = req.body;
      const receitaId = req.query.id;
      const dados = { title, description };
      console.log(receitaId);

      try {
        const receita = await prisma.income.update({
          where: {
            id: receitaId,
          },
          data: {
            title,
            description,
          },
        });
        return res.status(201).json(receita);
      } catch (error: any) {
        return res.status(404).json({ message: 'receita não encontrada!!!!!' });
      }

    case 'DELETE':
      const Id = req.query.id;
      try {
        const receita = await prisma.income.delete({
          where: {
            id: Id,
          },
        });
        if (receita.id) return res.json(`Marca: ${receita.title} foi apagada`);
      } catch (error: any) {
        return res.status(404).json({ message: 'receita não encontrada' });
      }
  }
};
