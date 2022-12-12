import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      const id = req.query.id;
      try {
        const marca = await prisma.brand.findFirst({
          where: {
            id: id as string,
          },
          select: {
            id: true,
            name: true,
            description: true,
          },
        });
        if (id) return res.json(marca);
      } catch (error: any) {
        return res.status(404).json({ message: 'Marca não encontrada' });
      }

    case 'PUT':
      const { name, description } = req.body;
      const marcaId = req.query.id;
      console.log(marcaId);

      try {
        const marca = await prisma.brand.update({
          where: {
            id: marcaId as string,
          },
          data: {
            name,
            description,
          },
        });
        return res.status(201).json(marca);
      } catch (error: any) {
        return res.status(404).json({ message: 'marca não encontrada!!!!!' });
      }

    case 'DELETE':
      const Id = req.query.id;
      try {
        const marca = await prisma.brand.delete({
          where: {
            id: Id as string,
          },
        });
        if (marca.id) return res.json(`marca: ${marca.name} foi apagada`);
      } catch (error: any) {
        return res.status(404).json({ message: 'marca não encontrada' });
      }
  }
};
