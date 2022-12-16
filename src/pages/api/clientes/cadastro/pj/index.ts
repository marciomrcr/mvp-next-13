import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'POST':
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

      try {
        await prisma.legalPerson.create({
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
        res.status(201).json({ Mensagem: 'PJ salva com sucesso' });
      } catch (error) {
        console.log('Falha ao salvar');
      }
  }
};
