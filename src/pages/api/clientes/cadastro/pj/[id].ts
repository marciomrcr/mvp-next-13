import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const id = req.query.id;
      try {
        const clientePJ = await prisma.legalPerson.findFirst({
          where: {
            id: id as string,
          },
          select: {
            id: true,
            name: true,
            phone: true,
            whatsApp: true,
            email: true,
            cnpj: true,
            contactName: true,
            instagram: true,
            stateRegistration: true,
            pixkey: true,
            creditLimit: true,
          },
        });
        if (id) return res.json(clientePJ);
      } catch (error: any) {
        return res.status(404).json({ message: 'PJ não encontrada' });
      }

    case 'PUT':
      const {
        name,
        phone,
        whatsApp,
        cnpj,
        email,
        instagram,
        contactName,
        stateRegistration,
        pixkey,
        creditLimit,
      } = req.body;
      const pjId = req.query.id;
      console.log(pjId);

      try {
        const clientePJ = await prisma.legalPerson.update({
          where: {
            id: pjId as string,
          },
          data: {
            name,
            phone,
            whatsApp,
            cnpj,
            email,
            instagram,
            contactName,
            stateRegistration,
            pixkey,
            creditLimit,
          },
        });
        return res.status(201).json(clientePJ);
      } catch (error: any) {
        return res.status(404).json({ message: 'PJ não encontrada!' });
      }

    case 'DELETE':
      const Id = req.query.id;
      try {
        const clientePJ = await prisma.legalPerson.delete({
          where: {
            id: Id as string,
          },
        });
        if (clientePJ.id) return res.json(`PJ: ${clientePJ.name} foi excluída`);
      } catch (error: any) {
        return res.status(404).json({ message: 'PJ não encontrada' });
      }
  }
};
