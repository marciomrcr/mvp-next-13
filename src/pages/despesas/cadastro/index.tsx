import Router from 'next/router';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

type IDespesas = {
  despesas: {
    id: string;
    title: string;
    description: string;
  }[];
};

type FormData = {
  id: string;
  title: string;
  description: string;
};

export default function CadastroDespesa(despesa: FormData) {
  function voltarPagina() {
    Router.push('/despesas');
  }
  const [form, setForm] = useState<FormData>({
    title: '',
    description: '',
    id: '',
  });

  async function createDespesa(data: FormData) {
    try {
      fetch(`/api/despesas/cadastro`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(() => setForm({ title: '', description: '', id: '' }));
      alert('Despesa criada com sucesso');
    } catch (error) {
      console.log(error);
      alert('Deu ruim');
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      createDespesa(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <br />
      <div className='flex justify-between flex-row'>
        <h3>Cadastro de Despesas</h3>
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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
        >
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Despesa</Form.Label>
            <Form.Control
              type='text'
              placeholder='Digite um nome'
              value={form.title}
              required
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            {/* <Form.Text className='text-muted'>Campo obrigatório.</Form.Text> */}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as='textarea'
              required
              placeholder='Descrição da receita'
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.query;

//   const despesa = await prisma.expense.findFirst({
//     where: {
//       id: {
//         equals: id as string,
//       },
//     },
//     select: { title: true, description: true },
//   });
//   return {
//     props: {
//       despesa,
//       // receitas: JSON.parse(JSON.stringify(receitas)),
//     },
//   };
// };
