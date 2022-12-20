import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const filial = await prisma.branchOffice.findMany({
          select: {
            id: true,
            legalPerson: {
              select: {
                name: true,
              },
            },
          },
        });

        return res.json(filial);
      } catch (error: any) {
        return res.status(404).json({ message: 'Nenhuma Filial cadastrada' });
      }

    case 'POST':
      const { legalPersonId } = req.body;

      try {
        const filial = await prisma.branchOffice.create({
          data: {
            legalPersonId,
          },
        });
        res.status(201).json({ filial });
      } catch (error) {
        console.log('Falha ao cadastrar');
      }
  }
};
