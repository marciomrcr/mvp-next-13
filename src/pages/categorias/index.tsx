import Router from 'next/router';
import { Button } from 'react-bootstrap';
import ListaCategorias from '../../components/categorias/ListaCategorias';
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
    Router.push('/categorias/new');
  }

  return (
    <div className='container'>
      <br />
      <div className='flex justify-between flex-row'>
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
