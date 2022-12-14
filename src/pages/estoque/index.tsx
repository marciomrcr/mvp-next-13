import Router from 'next/router';
import { Button } from 'react-bootstrap';
import ListaEstoque from '../../components/estoque/ListaEstoque';
import SideBar from '../../components/SideBar';
import prisma from '../../lib/prisma';
import { Estoque } from '../../types';

type Props = {
  estoque: Estoque[];
};

function EstoquePage(props: Props) {
  function novoEstoque() {
    Router.push('/estoque/novo');
  }

  return (
    <div className='flex bg-gray-200'>
      <SideBar />
      <div className=' w-4/5 pt-4 pl-4 '>
        <div className='flex justify-between '>
          <h3>Estoque de Produtos</h3>
          <Button
            onClick={() => novoEstoque()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            Nova Entrada
          </Button>
        </div>
        <ListaEstoque estoque={props.estoque} />
      </div>
    </div>
  );
}

export default EstoquePage;

export const getServerSideProps = async () => {
  const estoque = await prisma.stock.findMany({
    select: {
      id: true,
      product: {
        select: {
          name: true,
        },
      },
      amount: true,
      min_stock: true,
    },
    orderBy: {
      product: {
        name: 'asc',
      },
    },
  });
  console.log(estoque);

  return {
    props: { estoque },
  };
};
