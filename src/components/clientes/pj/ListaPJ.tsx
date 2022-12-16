import { useRouter } from 'next/router';
import { Button, Table } from 'react-bootstrap';
import api from '../../../services/api';
import { ClientePJ } from '../../../types';

type Props = {
  clientesPJ: ClientePJ[];
};

export default function ListaPJ(props: Props) {
  const router = useRouter();

  function editarPJ(id: string | undefined) {
    router.push(`/clientes/pj/cadastro/${id}`);
  }

  const handleDelete = async (id: string | undefined) => {
    await api.delete(`/api/clientes/cadastro/pj/${id}`, {
      method: 'DELETE',
    });
    router.push('/clientes/pj/lista-pj');
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
          {props.clientesPJ.map((cliente) => (
            <tr key={cliente.id}>
              <td className=''>{cliente.name}</td>
              <td className=''>{cliente.whatsApp}</td>

              <td className='flex justify-center   items-center flex-row '>
                <Button
                  onClick={() => editarPJ(cliente.id)}
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
