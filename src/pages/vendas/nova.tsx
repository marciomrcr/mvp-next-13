import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Sidebar from '../../components/SideBar';
import { Venda } from '../../types';

export default function CadastroVendas() {
  const router = useRouter();

  function voltarPagina() {
    router.push('/vendas');
  }

  const [venda, setVenda] = useState({
    physicalPersonId: '',
    productId: '',
    amount: '1',
    unitPrice: '',
    discount: '0',
    totalPrice: '',
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setVenda({
      ...venda,
      [name]: value,
    });

  const criarVenda = async (venda: Venda) => {
    try {
      await fetch(`/api/vendas/cadastro`, {
        body: JSON.stringify(venda),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      return alert('Venda criado com sucesso');
    } catch (error) {
      console.log(error);
      alert('Deu ruim');
    }
  };

  const loadVenda = async (id: string) => {
    const res = await fetch(`/api/vendas/cadastro/${id}`);
    const venda = await res.json();
    setVenda({
      physicalPersonId: venda.physicalPersonId,
      productId: venda.productId,
      amount: venda.amount,
      unitPrice: venda.unitPrice,
      discount: venda.discount,
      totalPrice: venda.totalPrice,
    });
  };

  const updateVenda = async (id: string, venda: Venda) => {
    await fetch(`/api/vendas/cadastro/${id}`, {
      body: JSON.stringify(venda),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    return alert('Venda alterada com sucesso');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === 'string') {
        updateVenda(router.query.id, venda);
      } else {
        await criarVenda(venda);
      }
      voltarPagina();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') loadVenda(router.query.id);
    console.log(router.query.id);
  }, [router.query]);

  return (
    <div className='flex  bg-gray-200'>
      <Sidebar />
      <div className='container'>
        <br />
        <div className='flex justify-between flex-row'>
          <h3>Cadastro de Venda</h3>
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
            <Form.Group className='mb-2'>
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Digite o nome do cliente'
                name='physicalPersonId'
                value={venda.physicalPersonId}
                required
                onChange={handleChange}
              />

              {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Produto</Form.Label>
              <Form.Control
                size='sm'
                type='text'
                required
                placeholder='Nome do produto'
                name='productId'
                value={venda.productId}
                onChange={handleChange}
              />
            </Form.Group>
            <div className='flex justify-between'>
              <Form.Group className='mb-2'>
                <Form.Label>Qtde</Form.Label>
                <Form.Control
                  size='sm'
                  type='text'
                  placeholder='Quantidade'
                  name='amount'
                  value={venda.amount}
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  size='sm'
                  type='text'
                  placeholder='Preço'
                  name='unitPrice'
                  value={venda.unitPrice}
                  onChange={handleChange}
                />

                {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
              </Form.Group>{' '}
              <Form.Group className='mb-2'>
                <Form.Label>Desconto</Form.Label>
                <Form.Control
                  size='sm'
                  type='text'
                  placeholder='Desconto?'
                  name='discount'
                  value={venda.discount}
                  onChange={handleChange}
                />{' '}
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Cor</Form.Label>
                <Form.Control
                  size='sm'
                  type='text'
                  placeholder='Total'
                  name='totalPrice'
                  value={venda.totalPrice}
                  onChange={handleChange}
                />

                {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
              </Form.Group>
            </div>

            {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}

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
