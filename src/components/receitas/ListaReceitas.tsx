import { useRouter } from 'next/router';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';

type Receitas = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  receitas: Receitas[];
};

export default function ListaReceitas(props: Props) {
  const router = useRouter();

  function editarReceita(id: string) {
    router.push(`/receitas/cadastro/${id}`);
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/api/receitas/cadastro/${id}`, {
      method: 'DELETE',
    });
    router.push('/receitas');
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
          {props.receitas.map((receita) => (
            <tr key={receita.id}>
              <td className=''>{receita.title}</td>
              <td className=''>{receita.description}</td>

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
