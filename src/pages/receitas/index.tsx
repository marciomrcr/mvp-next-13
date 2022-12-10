import Router from 'next/router';
import { Button, Table } from 'react-bootstrap';
import prisma from '../../lib/prisma';
import api from '../../services/api';

type Receitas = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  receitas: Receitas[];
};

function ReceitasPage(props: Props) {
  function novaReceita() {
    Router.push('/receitas/cadastro');
  }
  function editarReceita(id: string) {
    Router.push(`/receitas/cadastro/${id}`);
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/api/receitas/cadastro/${id}`, {
      method: 'DELETE',
    });
    Router.push('/receitas');
  };

  return (
    <div className='container'>
      <br />
      <div className='flex justify-between flex-row'>
        <h3>Receitas Cadastradas</h3>
        <Button
          onClick={() => novaReceita()}
          variant='dark'
          size='sm'
          className='mb-2'
        >
          Nova Receita
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr className='text-center'>
            <th className='w-25'>#id</th>
            <th>Nome</th>
            <th>Descrição</th>

            <th className='flex j'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.receitas.map((receita) => (
            <tr key={receita.id}>
              <td className=''>{receita.id}</td>
              <td>{receita.title}</td>
              <td>{receita.description}</td>

              <td className='flex justify-center   items-center flex-row '>
                <Button
                  onClick={() => editarReceita(receita.id)}
                  className='m-2'
                  size='sm'
                >
                  Editar
                </Button>
                {''}
                <Button
                  onClick={() => handleDelete(receita.id)}
                  className='m-2'
                  variant='danger'
                  size='sm'
                >
                  Excluir
                </Button>
                {''}
                <Button className='m-2' variant='info' size='sm'>
                  Visualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ReceitasPage;

export const getServerSideProps = async () => {
  const receitas = await prisma.income.findMany({
    select: {
      id: true,
      title: true,
      description: true,
    },
    orderBy: {
      title: 'asc',
    },
  });
  console.log(receitas);

  return {
    props: {
      // receitas: JSON.parse(JSON.stringify(receitas)),

      receitas,
    },
  };
};
