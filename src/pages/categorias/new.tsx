import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

type ICategorias = {
  categorias: {
    id?: string;
    name: string;
    description?: string;
  }[];
};

type Categoria = {
  id?: string;
  name: string;
  description: string;
  createdAt?: Date;
};

export default function CadastroCategorias() {
  const router = useRouter();

  function voltarPagina() {
    router.push('/categorias');
  }

  const [categoria, setCategoria] = useState({
    name: '',
    description: '',
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCategoria({
      ...categoria,
      [name]: value,
    });

  const criarCategoria = async (categoria: Categoria) => {
    try {
      await fetch(`/api/categorias/cadastro`, {
        body: JSON.stringify(categoria),
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

  const loadCategoria = async (id: string) => {
    const res = await fetch(`/api/categorias/cadastro/${id}`);
    const categoria = await res.json();
    setCategoria({ name: categoria.name, description: categoria.description });
  };

  const updateCategoria = async (id: string, categoria: Categoria) => {
    await fetch(`/api/categorias/cadastro/${id}`, {
      body: JSON.stringify(categoria),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    return alert('Despesa criada com sucesso');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === 'string') {
        updateCategoria(router.query.id, categoria);
      } else {
        await criarCategoria(categoria);
      }
      voltarPagina();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') loadCategoria(router.query.id);
    console.log(router.query.id);
  }, [router.query]);

  return (
    <div className='container'>
      <br />
      <div className='flex justify-between flex-row'>
        <h3>Cadastro de Categoria</h3>
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
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type='text'
              placeholder='Digite um nome'
              name='name'
              value={categoria.name}
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
              value={categoria.description}
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.query;

//   const categoria = await prisma.category.findFirst({
//     where: {
//       id: {
//         equals: id as string,
//       },
//     },
//     select: { name: true, description: true },
//   });
//   return {
//     props: {
//       categoria,
//       // receitas: JSON.parse(JSON.stringify(receitas)),
//     },
//   };
// };
