import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

type Produto = {
  id?: string;
  name: string;
  description?: string;
  category: string;
  brand?: string;
  size?: string;
  colors?: string;
  price?: string;
};

export default function CadastroProdutos() {
  const router = useRouter();

  function voltarPagina() {
    router.push('/produtos');
  }

  const [produto, setProduto] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    size: '',
    colors: '',
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setProduto({
      ...produto,
      [name]: value,
    });

  const criarProduto = async (produto: Produto) => {
    try {
      await fetch(`/api/produtos/cadastro`, {
        body: JSON.stringify(produto),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      return alert('Produto criado com sucesso');
    } catch (error) {
      console.log(error);
      alert('Deu ruim');
    }
  };

  const loadProduto = async (id: string) => {
    const res = await fetch(`/api/produtos/cadastro/${id}`);
    const produto = await res.json();
    setProduto({
      name: produto.name,
      description: produto.description,
      category: produto.category,
      brand: produto.brand,
      size: produto.size,
      colors: produto.colors,
    });
  };

  const updateProduto = async (id: string, produto: Produto) => {
    await fetch(`/api/produtos/cadastro/${id}`, {
      body: JSON.stringify(produto),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    return alert('Produto alterado com sucesso');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === 'string') {
        updateProduto(router.query.id, produto);
      } else {
        await criarProduto(produto);
      }
      voltarPagina();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') loadProduto(router.query.id);
    console.log(router.query.id);
  }, [router.query]);

  return (
    <div className='container'>
      <br />
      <div className='flex justify-between flex-row'>
        <h3>Cadastro de Produto</h3>
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
          <Form.Group className='mb-2' controlId='formBasicEmail'>
            <Form.Label>Produto</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              placeholder='Digite um nome'
              name='name'
              value={produto.name}
              required
              onChange={handleChange}
            />

            {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
          </Form.Group>
          <Form.Group className='mb-2' controlId='formBasicPassword'>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              size='sm'
              required
              placeholder='Descrição da receita'
              name='description'
              value={produto.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-2' controlId='formBasicEmail'>
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              placeholder='Digite uma categoria'
              name='category'
              value={produto.category}
              required
              onChange={handleChange}
            />

            {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
          </Form.Group>
          <Form.Group className='mb-2' controlId='formBasicEmail'>
            <Form.Label>Marca</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              placeholder='Digite uma marca'
              name='brand'
              value={produto.brand}
              onChange={handleChange}
            />

            {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
          </Form.Group>
          <Form.Group className='mb-2' controlId='formBasicEmail'>
            <Form.Label>Tamanho</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              placeholder='Digite o tamanho'
              name='size'
              value={produto.size}
              onChange={handleChange}
            />

            {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
          </Form.Group>
          <Form.Group className='mb-2' controlId='formBasicEmail'>
            <Form.Label>Cor</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              placeholder='Digite um nome'
              name='colors'
              value={produto.colors}
              onChange={handleChange}
            />

            {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
          </Form.Group>
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
  );
}
