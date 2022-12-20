import { useRouter } from 'next/router';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import { Estoque } from '../../types';

type Props = {
  estoque: Estoque[];
};

export default function ListaEstoque(props: Props) {
  const router = useRouter();

  function editarEstoque(id: string | undefined) {
    router.push(`/estoque/cadastro/${id}`);
  }

  const handleDelete = async (id: string | undefined) => {
    await api.delete(`/api/estoque/cadastro/${id}`, {
      method: 'DELETE',
    });
    router.push('/estoque');
  };

  return (
    <div className='flex'>
      <Table striped bordered hover>
        <thead>
          <tr className=' text-center'>
            <th>Produto</th>
            <th>Qtde</th>
            <th>Est. Mínimo</th>
            <th className='flex justify-center'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.estoque?.map((item) => (
            <tr key={item.id}>
              <td className=''>{item.product?.name}</td>
              <td className=''>{item.amount}</td>
              <td className=''>{item.min_stock}</td>

              <td className='flex justify-center   items-center flex-row '>
                <Button
                  onClick={() => editarEstoque(item.id)}
                  className='m-2'
                  size='sm'
                >
                  Editar
                </Button>
                {''}
                <Button
                  onClick={() => handleDelete(item.id)}
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
