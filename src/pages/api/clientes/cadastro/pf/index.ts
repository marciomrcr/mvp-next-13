import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const id = req.query.id;
      try {
        const cliente = await prisma.physicalPerson.findFirst({
          where: {
            id: id as string,
          },
          select: {
            name: true,
            phone: true,
            whatsApp: true,
            cpf: true,
            identity: true,
            creditLimit: true,
          },
        });
        if (id) return res.json(`Cliente: ${cliente?.name} foi apagado`);
      } catch (error: any) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

    case 'POST':
      const { name, phone, cpf, identity, whatsApp, creditLimit } = req.body;

      try {
        await prisma.physicalPerson.create({
          data: {
            name,
            phone,
            cpf,
            identity,
            whatsApp,
            creditLimit,
          },
        });
        res.status(201).json({ Mensagem: 'Cliente salvo com sucesso' });
      } catch (error) {
        console.log('Falha ao salvar');
      }
  }
};
