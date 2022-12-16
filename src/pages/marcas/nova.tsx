import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

type Marca = {
  id?: string;
  name: string;
  description: string;
};

export default function CadastroMarcas() {
  const router = useRouter();

  function voltarPagina() {
    router.push('/marcas');
  }

  const [marca, setMarca] = useState({
    name: '',
    description: '',
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setMarca({
      ...marca,
      [name]: value,
    });

  const criarMarca = async (marca: Marca) => {
    try {
      await fetch(`/api/marcas/cadastro`, {
        body: JSON.stringify(marca),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      return alert('Marca criada com sucesso');
    } catch (error) {
      console.log(error);
      alert('Deu ruim');
    }
  };

  const loadMarca = async (id: string) => {
    const res = await fetch(`/api/marcas/cadastro/${id}`);
    const marca = await res.json();
    setMarca({ name: marca.name, description: marca.description });
  };

  const updateMarca = async (id: string, marca: Marca) => {
    await fetch(`/api/marcas/cadastro/${id}`, {
      body: JSON.stringify(marca),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    return alert('Marca alterada com sucesso');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === 'string') {
        updateMarca(router.query.id, marca);
      } else {
        await criarMarca(marca);
      }
      voltarPagina();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') loadMarca(router.query.id);
    console.log(router.query.id);
  }, [router.query]);

  return (
    <div className='container'>
      <br />
      <div className='flex justify-between flex-row'>
        <h3>Cadastro de Marca</h3>
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
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type='text'
              placeholder='Digite um nome'
              name='name'
              value={marca.name}
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
              value={marca.description}
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
