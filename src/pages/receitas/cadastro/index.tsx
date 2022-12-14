import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import prisma from '../../../lib/prisma';
import api from '../../../services/api';

type IReceita = {
  id?: string;
  title: string;
  description: string;
};

type ReceitaProps = {
  receita: IReceita;
};

export default function CadastroReceita(props: ReceitaProps) {
  function voltarPagina() {
    Router.push('/receitas');
  }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function createReceita(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post(`/api/receitas/cadastro`, {
        title,
        description,
      });
      alert('Receita criada com sucesso');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.log(error);
      alert('Deu ruim');
    }
  }

  return (
    <div className='container'>
      <br />
      <div className='flex justify-between flex-row'>
        <h3>Cadastro de Receitas</h3>
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
        <Form onSubmit={createReceita}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Receita</Form.Label>
            <Form.Control
              value={title}
              type='text'
              name={title}
              required
              onChange={(event) => setTitle(event.target.value)}
              placeholder='Digite um nome'
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
              placeholder='Descrição da receita'
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
