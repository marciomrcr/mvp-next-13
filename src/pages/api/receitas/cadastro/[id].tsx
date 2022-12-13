import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      const id = req.query.id;
      try {
        const receita = await prisma.income.findFirst({
          where: {
            id: id as string,
          },
          select: {
            id: true,
            title: true,
            description: true,
          },
        });
        if (id) return res.json(receita);
      } catch (error: any) {
        return res.status(404).json({ message: 'receita não encontrada' });
      }

    case 'PUT':
      const { title, description } = req.body;
      const receitaId = req.query.id;
      console.log(receitaId);

      try {
        const receita = await prisma.income.update({
          where: {
            id: receitaId as string,
          },
          data: {
            title,
            description,
          },
        });
        return res.status(201).json(receita);
      } catch (error: any) {
        return res.status(404).json({ message: 'Receita não encontrada!!!!!' });
      }

    case 'DELETE':
      const Id = req.query.id;
      try {
        const receita = await prisma.income.delete({
          where: {
            id: Id as string,
          },
        });
        if (receita.id)
          return res.json(`Receita: ${receita.title} foi apagada`);
      } catch (error: any) {
        return res.status(404).json({ message: 'Receita não encontrada' });
      }
  }
};
