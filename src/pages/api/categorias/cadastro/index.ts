import { NextApiRequest, NextApiResponse } from 'next';
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
            name: true,
            description: true,
          },
        });
        if (id) return res.json(`Marca: ${categoria?.name} foi apagada`);
      } catch (error: any) {
        return res.status(404).json({ message: 'receita não encontrada' });
      }

    case 'POST':
      const { name, description } = req.body;

      try {
        await prisma.category.create({
          data: {
            name,
            description,
          },
        });
        res.status(201).json({ Mensagem: 'Categoria salva com sucesso' });
      } catch (error) {
        console.log('Falhou');
      }
  }
};
