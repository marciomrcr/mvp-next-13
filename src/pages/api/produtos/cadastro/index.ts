import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const produto = await prisma.product.findMany({
          select: {
            name: true,
            description: true,
            category: true,
            brand: true,
            size: true,
            colors: true,
          },
        });

        return res.json(produto);
      } catch (error: any) {
        return res.status(404).json({ message: 'Produto não encontrada' });
      }

    case 'POST':
      const { name, description, category, brand, size, colors } = req.body;

      try {
        const produto = await prisma.product.create({
          data: {
            name,
            description,
            category,
            brand,
            size,
            colors,
          },
        });
        res.status(201).json({ produto });
      } catch (error) {
        console.log('Falha ao cadastrar');
      }
  }
};
