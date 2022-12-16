import { useRouter } from 'next/router';
import { Button, Table } from 'react-bootstrap';
import api from '../../../services/api';
import { ClientePF } from '../../../types';

type Props = {
  clientesPf: ClientePF[];
};

export default function ListaClientePF(props: Props) {
  const router = useRouter();

  function editarClientePF(id: string | undefined) {
    router.push(`/clientes/pf/cadastro/${id}`);
  }

  const handleDelete = async (id: string | undefined) => {
    await api.delete(`/api/clientes/cadastro/pf/${id}`, {
      method: 'DELETE',
    });
    router.push('/clientes');
  };

  return (
    <div className='flex w-4/5'>
      <Table striped bordered hover>
        <thead>
          <tr className='justify-center'>
            <th>Nome</th>
            <th>WhatsApp</th>

            <th className='flex justify-center'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.clientesPf.map((cliente) => (
            <tr key={cliente.id}>
              <td className=''>{cliente.name}</td>
              <td className=''>{cliente.whatsApp}</td>

              <td className='flex justify-center   items-center flex-row '>
                <Button
                  onClick={() => editarClientePF(cliente.id)}
                  className='m-2'
                  size='sm'
                >
                  Editar
                </Button>
                {''}
                <Button
                  onClick={() => handleDelete(cliente.id)}
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
