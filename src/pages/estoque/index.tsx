import Router from 'next/router';
import { Button } from 'react-bootstrap';
import ListaProdutos from '../../components/produtos/ListaProdutos';
import SideBar from '../../components/SideBar';
import prisma from '../../lib/prisma';

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

function EstoquePage(props: Props) {
  function novoProduto() {
    Router.push('/produtos/novo');
  }

  return (
    <div className='flex'>
      <SideBar />
      <div className=' w-4/5 pt-4 pl-4 '>
        <div className='flex justify-between '>
          <h3>Produtos Cadastrados</h3>
          <Button
            onClick={() => novoProduto()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            Novo Produto
          </Button>
        </div>

        <ListaProdutos produtos={props.produtos} />
      </div>
    </div>
  );
}

export default EstoquePage;

export const getServerSideProps = async () => {
  const produtos = await prisma.stock.findMany({
    select: {
      branchOfficeId: true,
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
  console.log(produtos);

  return {
    props: { produtos },
  };
};
