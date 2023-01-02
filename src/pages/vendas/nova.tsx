import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Sidebar from '../../components/SideBar';
import { Checkout } from '../../components/vendas/Checkout';
import prisma from '../../lib/prisma';
import { ProdutosCart } from '../../types';

type Props = {
  produtos: ProdutosCart[];
};

type PropsProduto = {
  produto: {
    id?: string;
    produtoNome: string;
    preco: string;
    imagem?: string;
  };
};

export default function VendasCart(props: Props, propsProduto: PropsProduto) {
  const router = useRouter();

  function voltarPagina() {
    router.push('/vendas');
  }

  return (
    <div className='flex  bg-gray-200'>
      <Sidebar />
      <div className='container'>
        <br />
        <div className='flex justify-between flex-row'>
          <h3>Cadastro de Venda</h3>
          <Button
            onClick={() => voltarPagina()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            Voltar
          </Button>
        </div>
        <br />
        <div className='container'>
          <div>
            <Checkout produtos={props.produtos} />
          </div>
          {/* <VendaCart produtos={props.produtos} /> */}

          {/* {router.query.id ? (
            <Button variant='dark' size='sm' type='submit'>
              Alterar
            </Button>
          ) : (
            <Button variant='dark' size='sm' type='submit'>
              Salvar
            </Button>
          )} */}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const produtos = await prisma.produtos.findMany({
    select: {
      id: true,
      produtoNome: true,
      preco: true,
    },
    orderBy: {
      produtoNome: 'asc',
    },
  });
  console.log(produtos);

  return {
    props: {
      produtos,
    },
  };
};
