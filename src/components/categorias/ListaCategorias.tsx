import { useRouter } from 'next/router';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';

type Categorias = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  categorias: Categorias[];
};

export default function ListaCategorias(props: Props) {
  const router = useRouter();

  function editarCategoria(id: string) {
    router.push(`/categorias/cadastro/${id}`);
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/api/categorias/cadastro/${id}`, {
      method: 'DELETE',
    });
    router.push('/categorias');
  };

  return (
    <div>
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
          {props.categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td className=''>{categoria.id}</td>
              <td>{categoria.name}</td>
              <td>{categoria.description}</td>

              <td className='flex justify-center   items-center flex-row '>
                <Button
                  onClick={() => editarCategoria(categoria.id)}
                  className='m-2'
                  size='sm'
                >
                  Editar
                </Button>
                {''}
                <Button
                  onClick={() => handleDelete(categoria.id)}
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
