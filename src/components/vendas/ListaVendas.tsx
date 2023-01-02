import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import api from '../../services/api';
import { Venda } from '../../types';

type Props = {
  vendas: Venda[];
};

export default function ListaVendas(props: Props) {
  const router = useRouter();

  function editarVendas(id: string | undefined) {
    router.push(`/vendas/cadastro/${id}`);
  }

  const handleDelete = async (id: string | undefined) => {
    await api.delete(`/api/vendas/cadastro/${id}`, {
      method: 'DELETE',
    });
    router.push('/vendas');
  };

  return (
    <>
      <div className='flex justify-center items-center w-full'>
        <table className=' shadow-2xl font-[Poppins] border-2 border-cyan-200 w-9/12 overflow-hidden'>
          <thead className='text-white'>
            <tr className='border-1 border-black text-center '>
              <th className='py-0 bg-cyan-800 text-white'>Cliente</th>
              <th className='py-0 bg-cyan-800 text-white'>Qtde Itens</th>
              <th className='py-0 bg-cyan-800 text-white'>Total</th>

              <th className='py-3 bg-cyan-800 text-white'>Ações</th>
            </tr>
          </thead>

          <tbody className='text-cyan-900 text-center'>
            {props.vendas?.map((venda, index) => (
              <tr
                key={index}
                className=' border-solid  hover:bg-cyan-100  bg-cyan-200  '
              >
                <td className=' flex justify-start px-6'>
                  {venda.cliente?.name}
                </td>
                <td className=' px-6'>{venda.cart?.qtde_Items}</td>
                <td className=' px-6'>{venda.cart?.total}</td>

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
        </table>
      </div>
    </>
  );
}
