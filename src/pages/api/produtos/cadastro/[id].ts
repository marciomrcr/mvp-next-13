import type { NextApiRequest, NextApiResponse } from 'next';
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
            id: true,
            name: true,
            description: true,
            category: true,
            brand: true,
            size: true,
            colors: true,
          },
        });
        if (id) return res.json(produto);
      } catch (error: any) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

    case 'PUT':
      const { name, description, category, brand, size, colors } = req.body;
      const produtoId = req.query.id;
      console.log(produtoId);

      try {
        const produto = await prisma.product.update({
          where: {
            id: produtoId as string,
          },
          data: {
            name,
            description,
            category,
            brand,
            size,
            colors,
          },
        });
        return res.status(201).json(produto);
      } catch (error: any) {
        return res.status(404).json({ message: 'Produto não encontrado!!!!!' });
      }

    case 'DELETE':
      const Id = req.query.id;
      try {
        const produto = await prisma.product.delete({
          where: {
            id: Id as string,
          },
        });
        if (produto.id) return res.json(`Produto: ${produto.name} foi apagado`);
      } catch (error: any) {
        return res.status(404).json({ message: 'Produto não encontrada' });
      }
  }
};
