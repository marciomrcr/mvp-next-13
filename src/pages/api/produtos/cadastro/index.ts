import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const id = req.query.id;
      try {
        const produto = await prisma.product.findFirst({
          where: {
            id: id as string,
          },
          select: {
            name: true,
            description: true,
            category: true,
            brand: true,
            size: true,
            colors: true,
          },
        });
        if (id) return res.json(`Produto: ${produto?.name}`);
      } catch (error: any) {
        return res.status(404).json({ message: 'Produto não encontrada' });
      }

    case 'POST':
      const { name, description, category, brand, size, colors } = req.body;

      try {
        await prisma.product.create({
          data: {
            name,
            description,
            category,
            brand,
            size,
            colors,
          },
        });
        res.status(201).json({ Mensagem: 'Produto salvo com sucesso' });
      } catch (error) {
        console.log('Falha ao cadastrar');
      }
  }
};
