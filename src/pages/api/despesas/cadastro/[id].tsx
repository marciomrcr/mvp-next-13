import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'PUT':
      const { title, description } = req.body;
      const despesaId = req.query.id;
      console.log(despesaId);

      try {
        const despesa = await prisma.expense.update({
          where: {
            id: despesaId,
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
            id: Id,
          },
        });
        if (despesa.id)
          return res.json(`Despesa: ${despesa.title} foi apagada`);
      } catch (error: any) {
        return res.status(404).json({ message: 'despesa não encontrada' });
      }
  }
};
