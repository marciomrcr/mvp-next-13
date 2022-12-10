import prisma from '../../../../lib/prisma';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  const { title, description } = req.body;

  try {
    await prisma.income.create({
      data: {
        title,
        description,
      },
    });
    resp.status(201).json({ Mensagem: 'Entrada salva' });
  } catch (error) {
    console.log('Falha');
  }
}
