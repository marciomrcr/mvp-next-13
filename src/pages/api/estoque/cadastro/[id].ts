import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      const id = req.query.id;
      try {
        const estoque = await prisma.stock.findFirst({
          where: {
            id: id as string,
          },
          select: {
            id: true,
            product: {
              select: {
                name: true,
              },
            },
            productId: true,
            amount: true,
            min_stock: true,
          },
        });
        if (id) return res.json(estoque);
      } catch (error: any) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

    case 'PUT':
      const { productId, amount, min_stock } = req.body;
      const estoqueId = req.query.id;
      console.log(estoqueId);

      try {
        const estoque = await prisma.stock.update({
          where: {
            id: estoqueId as string,
          },
          data: {
            productId,
            amount,
            min_stock,
          },
        });
        return res.status(201).json(estoque);
      } catch (error: any) {
        return res.status(404).json({ message: 'Produto não encontrado!!!!!' });
      }

    case 'DELETE':
      const Id = req.query.id;
      try {
        const estoque = await prisma.stock.delete({
          where: {
            id: Id as string,
          },
        });
        if (estoque.id)
          return res.json(
            `Estoque do produto: ${estoque.productId} foi apagado`
          );
      } catch (error: any) {
        return res.status(404).json({ message: 'estoque não encontrado' });
      }
  }
};
