import Router from 'next/router';
import { Button } from 'react-bootstrap';
import ListaDespesas from '../../components/despesas/ListaDespesas';
import SideBar from '../../components/SideBar';
import prisma from '../../lib/prisma';

type Despesas = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  despesas: Despesas[];
};

function DespesasPage(props: Props) {
  function novaDespesa() {
    Router.push('/despesas/nova');
  }

  return (
    <div className='flex'>
      <SideBar />
      <div className=' w-4/5 pt-4 pl-4 '>
        <div className='flex justify-between '>
          <h3>Despesas Cadastradas</h3>
          <Button
            onClick={() => novaDespesa()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            Nova despesa
          </Button>
        </div>

        <ListaDespesas despesas={props.despesas} />
      </div>
    </div>
  );
}

export default DespesasPage;

export const getServerSideProps = async () => {
  const despesas = await prisma.expense.findMany({
    select: {
      id: true,
      title: true,
      description: true,
    },
    orderBy: {
      title: 'asc',
    },
  });
  console.log(despesas);

  return {
    props: { despesas },
  };
};
