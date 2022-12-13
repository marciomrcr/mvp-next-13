import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

type IDespesas = {
  despesas: {
    id?: string;
    title: string;
    description?: string;
  }[];
};

type Despesa = {
  id?: string;
  title: string;
  description: string;
};

export default function CadastroDespesas() {
  const router = useRouter();

  function voltarPagina() {
    router.push('/despesas');
  }

  const [despesa, setDespesa] = useState({
    title: '',
    description: '',
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDespesa({
      ...despesa,
      [name]: value,
    });

  const criarDespesa = async (despesa: Despesa) => {
    try {
      await fetch(`/api/despesas/cadastro`, {
        body: JSON.stringify(despesa),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      return alert('Despesa criada com sucesso');
    } catch (error) {
      console.log(error);
      alert('Deu ruim');
    }
  };

  const loadDespesa = async (id: string) => {
    const res = await fetch(`/api/despesas/cadastro/${id}`);
    const despesa = await res.json();
    setDespesa({ title: despesa.title, description: despesa.description });
  };

  const updateDespesa = async (id: string, despesa: Despesa) => {
    await fetch(`/api/despesas/cadastro/${id}`, {
      body: JSON.stringify(despesa),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    return alert('Despesa alterada com sucesso');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === 'string') {
        updateDespesa(router.query.id, despesa);
      } else {
        await criarDespesa(despesa);
      }
      voltarPagina();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') loadDespesa(router.query.id);
    console.log(router.query.id);
  }, [router.query]);

  return (
    <div className='container'>
      <br />
      <div className='flex justify-between flex-row'>
        <h3>Cadastro de Despesa</h3>
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
            <Form.Label>Despesa</Form.Label>
            <Form.Control
              type='text'
              placeholder='Digite um nome'
              name='title'
              value={despesa.title}
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
              value={despesa.description}
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
