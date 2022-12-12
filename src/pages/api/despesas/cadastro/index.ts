import prisma from '../../../../lib/prisma';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  const { title, description } = req.body;

  try {
    await prisma.expense.create({
      data: {
        title,
        description,
      },
    });
    resp.status(201).json({ Mensagem: 'Despesa salva com sucesso' });
  } catch (error) {
    console.log('Falhou');
  }
}
