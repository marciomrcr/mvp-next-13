import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      const id = req.query.id;
      try {
        const categoria = await prisma.category.findFirst({
          where: {
            id: id as string,
          },
          select: {
            id: true,
            name: true,
            description: true,
          },
        });
        if (id) return res.json(categoria);
      } catch (error: any) {
        return res.status(404).json({ message: 'receita não encontrada' });
      }

    case 'PUT':
      const { name, description } = req.body;
      const categoriaId = req.query.id;
      console.log(categoriaId);

      try {
        const categoria = await prisma.category.update({
          where: {
            id: categoriaId as string,
          },
          data: {
            name,
            description,
          },
        });
        return res.status(201).json(categoria);
      } catch (error: any) {
        return res
          .status(404)
          .json({ message: 'categoria não encontrada!!!!!' });
      }

    case 'DELETE':
      const Id = req.query.id;
      try {
        const categoria = await prisma.category.delete({
          where: {
            id: Id as string,
          },
        });
        if (categoria.id)
          return res.json(`categoria: ${categoria.name} foi apagada`);
      } catch (error: any) {
        return res.status(404).json({ message: 'categoria não encontrada' });
      }
  }
};
