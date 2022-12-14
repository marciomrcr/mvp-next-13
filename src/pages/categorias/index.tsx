import Router from 'next/router';
import { Button } from 'react-bootstrap';
import ListaCategorias from '../../components/categorias/ListaCategorias';
import SideBar from '../../components/SideBar';
import prisma from '../../lib/prisma';

type Categorias = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  categorias: Categorias[];
};

function CategoriasPage(props: Props) {
  function novaCategoria() {
    Router.push('/categorias/nova');
  }

  return (
    <div className='flex'>
      <SideBar />
      <div className=' w-4/5 pt-4 pl-4 '>
        <div className='flex justify-between '>
          <h3>Categorias Cadastradas</h3>
          <Button
            onClick={() => novaCategoria()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            Nova categoria
          </Button>
        </div>

        <ListaCategorias categorias={props.categorias} />
      </div>
    </div>
  );
}

export default CategoriasPage;

export const getServerSideProps = async () => {
  const categorias = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
  console.log(categorias);

  return {
    props: { categorias },
  };
};
