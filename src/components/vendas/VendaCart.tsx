import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import api from '../../services/api';
import { ProdutosCart } from '../../types';

type Props = {
  produtos: ProdutosCart[];
};

export default function VendaCart(props: Props) {
  const router = useRouter();

  function editarVendas(id: string | undefined) {
    router.push(`/produtos/cadastro/${id}`);
  }

  const handleDelete = async (id: string | undefined) => {
    await api.delete(`/api/produtos/cadastro/${id}`, {
      method: 'DELETE',
    });
    router.push('/produtos');
  };

  return (
    <>
      <div className=' justify-center items-center w-full'>
        <table className=' shadow-md font-[Poppins] border-2 border-cyan-200 w-full overflow-hidden'>
          <thead className='text-white '>
            <tr className='border-1 border-black text-center '>
              <th className='w-4/12 bg-cyan-800 text-white'>Produto</th>
              <th className='text-start w-2/12 bg-cyan-800 text-white'>
                Preço
              </th>
              <th className=' bg-cyan-800 text-white w-6/12'>Quantidade</th>
            </tr>
          </thead>

          <tbody className='text-cyan-900 text-center'>
            {props.produtos?.map((produto, index) => (
              <tr
                key={index}
                className=' border-solid  hover:bg-cyan-100  bg-cyan-200  '
              >
                <td className=' flex justify-start px-2 py-0'>
                  {produto.produtoNome}
                </td>
                <td className='text-start px-2 py-0'>{produto.preco}</td>

                <td className='flex justify-around   items-center flex-row '>
                  <Button className='m-2' size='sm'>
                    Editar
                  </Button>
                  <div className='border-2 border-slate-800'>1</div>
                  <Button className='m-2' variant='danger' size='sm'>
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
        </table>
      </div>
    </>
  );
}
