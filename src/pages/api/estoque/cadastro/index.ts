import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const estoque = await prisma.stock.findMany({
          select: {
            product: {
              select: {
                name: true,
              },
            },
            amount: true,
            min_stock: true,
            productId: true,
          },
          orderBy: {
            product: { name: 'asc' },
          },
        });

        return res.json(estoque);
      } catch (error: any) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

    case 'POST':
      const { productId, amount, min_stock } = req.body;
      if (productId) {
        console.log('Produto já tem estoque cadastrado!');
      }
      try {
        const estoque = await prisma.stock.create({
          data: {
            productId,
            amount,
            min_stock,
          },
        });
        res.status(201).json({ estoque });
      } catch (error) {
        console.log('Falha ao cadastrar');
      }
  }
};
