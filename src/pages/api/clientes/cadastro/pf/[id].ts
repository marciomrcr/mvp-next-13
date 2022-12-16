import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const id = req.query.id;
      try {
        const clientePF = await prisma.physicalPerson.findFirst({
          where: {
            id: id as string,
          },
          select: {
            id: true,
            name: true,
            phone: true,
            whatsApp: true,
            cpf: true,
            identity: true,
          },
        });
        if (id) return res.json(clientePF);
      } catch (error: any) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

    case 'PUT':
      const { name, phone, whatsApp, cpf, identity } = req.body;
      const clientId = req.query.id;
      console.log(clientId);

      try {
        const clientePF = await prisma.physicalPerson.update({
          where: {
            id: clientId as string,
          },
          data: {
            name,
            phone,
            whatsApp,
            cpf,
            identity,
          },
        });
        return res.status(201).json(clientePF);
      } catch (error: any) {
        return res.status(404).json({ message: 'Cliente não encontrado!!!!!' });
      }

    case 'DELETE':
      const Id = req.query.id;
      try {
        const clientePF = await prisma.physicalPerson.delete({
          where: {
            id: Id as string,
          },
        });
        if (clientePF.id)
          return res.json(`Cliente: ${clientePF.name} foi excluído`);
      } catch (error: any) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
  }
};
