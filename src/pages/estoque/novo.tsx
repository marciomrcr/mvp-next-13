import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Sidebar from '../../components/SideBar';
import { Estoque } from '../../types';

export default function CadastroEstoque() {
  const router = useRouter();

  function voltarPagina() {
    router.push('/estoque');
  }

  const [estoque, setEstoque] = useState({
    productId: '',
    amount: 1,
    min_stock: 0,
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEstoque({
      ...estoque,
      [name]: value,
    });

  const criarEstoque = async (estoque: Estoque) => {
    try {
      await fetch(`/api/estoque/cadastro`, {
        body: JSON.stringify(estoque),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      return alert('Estoque cadastrado com sucesso');
    } catch (error) {
      console.log(error);
      alert('Deu ruim');
    }
  };

  const loadEstoque = async (id: string) => {
    const res = await fetch(`/api/estoque/cadastro/${id}`);
    const estoque = await res.json();
    setEstoque({
      productId: estoque.productId,
      amount: estoque.amount,
      min_stock: estoque.min_stock,
    });
  };

  const updateEstoque = async (id: string, estoque: Estoque) => {
    await fetch(`/api/estoque/cadastro/${id}`, {
      body: JSON.stringify(estoque),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    return alert('Estoque alterado com sucesso');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === 'string') {
        updateEstoque(router.query.id, estoque);
      } else {
        await criarEstoque(estoque);
      }
      voltarPagina();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') loadEstoque(router.query.id);
    console.log(router.query.id);
  }, [router.query]);

  return (
    <div className='flex  bg-gray-200'>
      <Sidebar />
      <div className='container'>
        <br />
        <div className='flex justify-between flex-row'>
          {router.query.id ? (
            <h3>Alterar de Estoque</h3>
          ) : (
            <h3>Cadastro de Estoque</h3>
          )}

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
            <Form.Group className='mb-2' controlId='formNome'>
              <Form.Label>Produto</Form.Label>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Nome do produto'
                name='productId'
                value={estoque.productId}
                required
                onChange={handleChange}
              />

              {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
            </Form.Group>

            <Form.Group className='mb-2' controlId='formDescription'>
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                size='sm'
                required
                type='number'
                placeholder='Descrição da receita'
                name='amount'
                value={estoque.amount}
                onChange={handleChange}
              />
            </Form.Group>
            <div className='flex justify-between'>
              <Form.Group className='mb-2' controlId='formCategoria'>
                <Form.Label>Est. Mínimo</Form.Label>
                <Form.Control
                  size='sm'
                  type='number'
                  placeholder='Digite uma categoria'
                  name='min_stock'
                  value={estoque.min_stock}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <Form.Group className='mb-2' controlId='formBasicCheckbox'>
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
    </div>
  );
}
