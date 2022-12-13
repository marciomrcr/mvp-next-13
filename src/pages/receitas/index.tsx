import Router from 'next/router';
import { Button } from 'react-bootstrap';
import ListaReceitas from '../../components/receitas/ListaReceitas';
import SideBar from '../../components/SideBar';
import prisma from '../../lib/prisma';

type Receitas = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  receitas: Receitas[];
};

function ReceitasPage(props: Props) {
  function novaReceita() {
    Router.push('/receitas/nova');
  }

  return (
    <div className='flex'>
      <SideBar />
      <div className=' w-4/5 pt-4 pl-4 '>
        <div className='flex justify-between '>
          <h3>Receitas Cadastradas</h3>
          <Button
            onClick={() => novaReceita()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            Nova Receita
          </Button>
        </div>

        <ListaReceitas receitas={props.receitas} />
      </div>
    </div>
  );
}

export default ReceitasPage;

export const getServerSideProps = async () => {
  const receitas = await prisma.income.findMany({
    select: {
      id: true,
      title: true,
      description: true,
    },
    orderBy: {
      title: 'asc',
    },
  });
  console.log(receitas);

  return {
    props: { receitas },
  };
};
