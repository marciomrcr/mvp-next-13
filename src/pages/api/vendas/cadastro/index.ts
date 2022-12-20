import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const id = req.query.id;
      try {
        const venda = await prisma.orderSale.findFirst({
          where: {
            id: id as string,
          },
          select: {
            physicalPerson: {
              select: {
                name: true,
              },
            },
            product: {
              select: {
                name: true,
              },
            },
            amount: true,
            unitPrice: true,
            discount: true,
            totalPrice: true,
          },
        });
        if (id) return res.json(`Venda: ${venda} foi apagada`);
      } catch (error: any) {
        return res.status(404).json({ message: 'Venda não encontrada' });
      }

    case 'POST':
      const {
        physicalPersonId,
        productId,
        amount,
        unitPrice,
        discount,
        totalPrice,
      } = req.body;

      try {
        const venda = await prisma.orderSale.create({
          data: {
            physicalPersonId,
            productId,
            amount,
            unitPrice,
            discount,
            totalPrice,
          },
        });
        res.status(201).json(venda);
      } catch (error) {
        console.log('Falha ao salvar');
      }
  }
};
