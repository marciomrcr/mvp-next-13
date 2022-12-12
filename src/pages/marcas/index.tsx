import Router from 'next/router';
import { Button } from 'react-bootstrap';
import ListaMarcas from '../../components/marcas/ListaMarcas';
import SideBar from '../../components/SideBar';
import prisma from '../../lib/prisma';

type Marcas = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  marcas: Marcas[];
};

function MarcasPage(props: Props) {
  function novaMarca() {
    Router.push('/marcas/nova');
  }

  return (
    <div className='flex'>
      <SideBar />
      <div className=' w-4/5 pt-4 pl-4 '>
        <div className='flex justify-between '>
          <h3>Marcas Cadastradas</h3>
          <Button
            onClick={() => novaMarca()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            Nova Marca
          </Button>
        </div>

        <ListaMarcas marcas={props.marcas} />
      </div>
    </div>
  );
}

export default MarcasPage;

export const getServerSideProps = async () => {
  const marcas = await prisma.brand.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
  console.log(marcas);

  return {
    props: { marcas },
  };
};
