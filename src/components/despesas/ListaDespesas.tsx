import { useRouter } from 'next/router';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';

type Despesas = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  despesas: Despesas[];
};

export default function ListaDespesas(props: Props) {
  const router = useRouter();

  function editarReceita(id: string) {
    router.push(`/despesas/cadastro/${id}`);
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/api/despesas/cadastro/${id}`, {
      method: 'DELETE',
    });
    router.push('/despesas');
  };

  return (
    <div className='flex'>
      <Table striped bordered hover>
        <thead>
          <tr className=' text-center'>
            <th>Nome</th>
            <th>Descrição</th>
            <th className='flex justify-center'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.despesas.map((despesa) => (
            <tr key={despesa.id}>
              <td className=''>{despesa.title}</td>
              <td className=''>{despesa.description}</td>

              <td className='flex justify-center   items-center flex-row '>
                <Button
                  onClick={() => editarReceita(despesa.id)}
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
