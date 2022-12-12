import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import prisma from '../../../lib/prisma';

type IReceita = {
  id?: string;
  title: string;
  description: string;
};

type ReceitaProps = {
  receita: IReceita;
};

export default function EditarReceita(props: ReceitaProps) {
  function voltarPagina() {
    Router.push('/receitas');
  }
  const [title, setTitle] = useState(props.receita.title);
  const [description, setDescription] = useState(props.receita.description);

  return (
    <div className='container'>
      <br />
      <div className='flex justify-between flex-row'>
        <h3>Detalhes da Receita</h3>
        <Button
          onClick={() => voltarPagina()}
          variant='dark'
          size='sm'
          className='mb-2'
        >
          Voltar
        </Button>
      </div>
      <br />
      <div className='container'>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Receita</Form.Label>
            <Form.Control
              value={title}
              type='text'
              name={title}
              required
              onChange={(event) => setTitle(event.target.value)}
            />

            {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as='textarea'
              value={description}
              name={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Desativar' />
          </Form.Group>
          <Button variant='dark' size='sm' type='submit'>
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const receita = await prisma.income.findFirst({
    where: {
      id: {
        equals: id as string,
      },
    },
    select: { title: true, description: true },
  });
  return {
    props: {
      receita,
      // receitas: JSON.parse(JSON.stringify(receitas)),
    },
  };
};
