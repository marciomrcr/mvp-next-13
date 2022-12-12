import Router from 'next/router';
import { Button, Table } from 'react-bootstrap';
import prisma from '../../lib/prisma';
import api from '../../services/api';

type IDespesas = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  despesas: IDespesas[];
};

function DespesasPage(props: Props) {
  function novaDespesa() {
    Router.push('/despesas/cadastro');
  }
  function editarDespesa(id: string) {
    Router.push(`/despesas/cadastro/${id}`);
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/api/despesas/cadastro/${id}`, {
      method: 'DELETE',
    });
    Router.push('/despesas');
  };

  return (
    <div className='container'>
      <br />
      <div className='flex justify-between flex-row'>
        <h3>Despesas Cadastradas</h3>
        <Button
          onClick={() => novaDespesa()}
          variant='dark'
          size='sm'
          className='mb-2'
        >
          Nova Despesa
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
          {props.despesas.map((despesa) => (
            <tr key={despesa.id}>
              <td className=''>{despesa.id}</td>
              <td>{despesa.title}</td>
              <td>{despesa.description}</td>

              <td className='flex justify-center   items-center flex-row '>
                <Button
                  onClick={() => editarDespesa(despesa.id)}
                  className='m-2'
                  size='sm'
                >
                  Editar
                </Button>
                {''}
                <Button
                  onClick={() => handleDelete(despesa.id)}
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

export default DespesasPage;

export const getServerSideProps = async () => {
  const despesas = await prisma.expense.findMany({
    select: {
      id: true,
      title: true,
      description: true,
    },
    orderBy: {
      title: 'asc',
    },
  });
  console.log(despesas);

  return {
    props: {
      // despesas: JSON.parse(JSON.stringify(despesas)),

      despesas,
    },
  };
};
