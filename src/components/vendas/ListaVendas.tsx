import { useRouter } from 'next/router';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import { Venda } from '../../types';

type Props = {
  vendas: Venda[];
};

export default function ListaVendas(props: Props) {
  const router = useRouter();

  function editarVendas(id: string) {
    router.push(`/vendas/cadastro/${id}`);
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/api/vendas/cadastro/${id}`, {
      method: 'DELETE',
    });
    router.push('/vendas');
  };

  return (
    <div className='flex'>
      <Table striped bordered hover>
        <thead>
          <tr className=' text-center'>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Qtde</th>
            <th>Preço</th>
            <th>Desc</th>
            <th>Total</th>

            <th className='flex justify-center'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.vendas?.map((venda, index) => (
            <tr key={index}>
              <td className=''>{venda.physicalPerson?.name}</td>
              <td className=''>{venda.product?.name}</td>
              <td className=''>{venda.amount}</td>
              <td className=''>{venda.unitPrice}</td>
              <td className=''>{venda.discount}</td>
              <td className=''>{venda.totalPrice}</td>

              <td className='flex justify-center   items-center flex-row '>
                <Button
                  onClick={() => editarVendas(venda.id)}
                  className='m-2'
                  size='sm'
                >
                  Editar
                </Button>
                {''}
                <Button
                  onClick={() => handleDelete(venda.id)}
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
