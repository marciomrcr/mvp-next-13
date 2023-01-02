import Router from 'next/router';
import { Button } from 'react-bootstrap';
import SideBar from '../../components/SideBar';
import ListaVendas from '../../components/vendas/ListaVendas';
import prisma from '../../lib/prisma';
import { Venda } from '../../types';

type Props = {
  vendas: Venda[];
};

function ProdutosPage(props: Props) {
  function novaVenda() {
    Router.push('/vendas/nova');
  }

  return (
    <div className='flex bg-gray-200'>
      <SideBar />
      <div className=' w-4/5 pt-4 pl-4 '>
        <div className='flex justify-between '>
          <h3>Vendas Realizadas</h3>
          <Button
            onClick={() => novaVenda()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            Nova Venda
          </Button>
        </div>

        <ListaVendas vendas={props.vendas} />
      </div>
    </div>
  );
}

export default ProdutosPage;

export const getServerSideProps = async () => {
  const vendas = await prisma.vendas.findMany({
    select: {
      id: true,
      cliente: {
        select: {
          name: true,
          id: true,
        },
      },

      cart: {
        select: {
          qtde_Items: true,
          total: true,
        },
      },
    },
    orderBy: {
      cliente: {
        name: 'asc',
      },
    },
  });
  console.log(vendas);

  return {
    props: {
      vendas,
    },
  };
};
