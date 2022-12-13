import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      const id = req.query.id;
      try {
        const despesa = await prisma.expense.findFirst({
          where: {
            id: id as string,
          },
          select: {
            id: true,
            title: true,
            description: true,
          },
        });
        if (id) return res.json(despesa);
      } catch (error: any) {
        return res.status(404).json({ message: 'receita não encontrada' });
      }

    case 'PUT':
      const { title, description } = req.body;
      const despesaId = req.query.id;
      console.log(despesaId);

      try {
        const despesa = await prisma.expense.update({
          where: {
            id: despesaId as string,
          },
          data: {
            title,
            description,
          },
        });
        return res.status(201).json(despesa);
      } catch (error: any) {
        return res.status(404).json({ message: 'despesa não encontrada!!!!!' });
      }

    case 'DELETE':
      const Id = req.query.id;
      try {
        const despesa = await prisma.expense.delete({
          where: {
            id: Id as string,
          },
        });
        if (despesa.id)
          return res.json(`despesa: ${despesa.title} foi apagada`);
      } catch (error: any) {
        return res.status(404).json({ message: 'despesa não encontrada' });
      }
  }
};
