import { useRouter } from 'next/router';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';

type Marcas = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  marcas: Marcas[];
};

export default function ListaMarcas(props: Props) {
  const router = useRouter();

  function editarMarca(id: string) {
    router.push(`/marcas/cadastro/${id}`);
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/api/marcas/cadastro/${id}`, {
      method: 'DELETE',
    });
    router.push('/marcas');
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
          {props.marcas.map((marca) => (
            <tr key={marca.id}>
              <td className=''>{marca.name}</td>
              <td className=''>{marca.description}</td>

              <td className='flex justify-center   items-center flex-row '>
                <Button
                  onClick={() => editarMarca(marca.id)}
                  className='m-2'
                  size='sm'
                >
                  Editar
                </Button>
                {''}
                <Button
                  onClick={() => handleDelete(marca.id)}
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
