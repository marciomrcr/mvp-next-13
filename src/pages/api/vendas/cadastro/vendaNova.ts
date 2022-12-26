import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const vendas = await prisma.vendas.findMany({
          select: {
            id: true,
            cliente: {
              select: {
                name: true,
                id: true,
              },
            },
            cart: {
              select: {
                id: true,
                qtde_Items: true,
                total: true,
                Cart_Items: {
                  select: {
                    subTotal: true,
                    desconto: true,
                    preco: true,
                    produto: {
                      select: {
                        productName: true,
                      },
                    },
                  },
                },
              },
            },
          },
          orderBy: {
            cliente: {
              name: 'asc',
            },
          },
        });
        res.status(200).json(vendas);
      } catch (error: any) {
        return res.json({ message: 'Venda não encontrada' });
      }

    case 'POST':
      const {
        clienteId,
        produtosId,
        qtde,
        preco,
        subTotal,
        desconto,
        qtde_Items,
        total,
      } = req.body;

      const vendaLinha = await prisma.cart.create({
        data: {
          Vendas: {
            create: {
              clienteId,
            },
          },
          Cart_Items: {
            create: {
              produtosId,
              qtde,
              preco,
              subTotal,
              desconto,
            },
          },
          qtde_Items,
          total,
        },
      });

      res.send(vendaLinha);
  }
};
