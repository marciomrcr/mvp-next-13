import { useRouter } from 'next/router';
import { Button, Table } from 'react-bootstrap';
import api from '../../services/api';

type Produtos = {
  id: string;
  name: string;
  description?: string;
  category: string;
  brand?: string;
  size?: string;
  colors?: string;
  price?: string;
};

type Props = {
  produtos: Produtos[];
};

export default function ListaProdutos(props: Props) {
  const router = useRouter();

  function editarProduto(id: string) {
    router.push(`/produtos/cadastro/${id}`);
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/api/produtos/cadastro/${id}`, {
      method: 'DELETE',
    });
    router.push('/produtos');
  };

  return (
    <div className='flex'>
      <Table striped bordered hover>
        <thead>
          <tr className=' text-center'>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Tamanho</th>
            <th>Cor</th>
            <th>Marca</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th className='flex justify-center'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.produtos.map((produto) => (
            <tr key={produto.id}>
              <td className=''>{produto.name}</td>
              <td className=''>{produto.description}</td>
              <td className=''>{produto.size}</td>
              <td className=''>{produto.colors}</td>
              <td className=''>{produto.brand}</td>
              <td className=''>{produto.category}</td>
              <td className=''>{produto.price}</td>

              <td className='flex justify-center   items-center flex-row '>
                <Button
                  onClick={() => editarProduto(produto.id)}
                  className='m-2'
                  size='sm'
                >
                  Editar
                </Button>
                {''}
                <Button
                  onClick={() => handleDelete(produto.id)}
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
