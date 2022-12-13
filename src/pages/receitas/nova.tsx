import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

type IReceitas = {
  receitas: {
    id?: string;
    title: string;
    description?: string;
  }[];
};

type Receita = {
  id?: string;
  title: string;
  description: string;
};

export default function CadastroReceitas() {
  const router = useRouter();

  function voltarPagina() {
    router.push('/receitas');
  }

  const [receita, setReceita] = useState({
    title: '',
    description: '',
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setReceita({
      ...receita,
      [name]: value,
    });

  const criarReceita = async (receita: Receita) => {
    try {
      await fetch(`/api/receitas/cadastro`, {
        body: JSON.stringify(receita),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      return alert('Receita criada com sucesso');
    } catch (error) {
      console.log(error);
      alert('Falha ao cadastrar');
    }
  };

  const loadReceita = async (id: string) => {
    const res = await fetch(`/api/receitas/cadastro/${id}`);
    const receita = await res.json();
    setReceita({ title: receita.title, description: receita.description });
  };

  const updateReceita = async (id: string, receita: Receita) => {
    await fetch(`/api/receitas/cadastro/${id}`, {
      body: JSON.stringify(receita),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    return alert('Receita alterada com sucesso');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === 'string') {
        updateReceita(router.query.id, receita);
      } else {
        await criarReceita(receita);
      }
      voltarPagina();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') loadReceita(router.query.id);
    console.log(router.query.id);
  }, [router.query]);

  return (
    <div className='container'>
      <br />
      <div className='flex justify-between flex-row'>
        <h3>Cadastro de Receita</h3>
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Receita</Form.Label>
            <Form.Control
              type='text'
              placeholder='Digite um nome'
              name='title'
              value={receita.title}
              required
              onChange={handleChange}
            />

            {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as='textarea'
              required
              placeholder='Descrição da receita'
              name='description'
              value={receita.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Desativar' />
          </Form.Group>
          {router.query.id ? (
            <Button variant='dark' size='sm' type='submit'>
              Alterar
            </Button>
          ) : (
            <Button variant='dark' size='sm' type='submit'>
              Salvar
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
}
