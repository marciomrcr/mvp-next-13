import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import ListaPJ from '../../../components/clientes/pj/ListaPJ';
import SideBar from '../../../components/SideBar';
import prisma from '../../../lib/prisma';
import { ClientePJ } from '../../../types';

type Props = {
  clientesPJ: ClientePJ[];
};

function PJPage(props: Props) {
  const router = useRouter();
  function novoClientePF() {
    router.push('/clientes/pf/novo');
  }
  function novoClientePJ() {
    router.push('/clientes/pj/novo');
  }

  function voltarPagina() {
    router.push('/clientes');
  }

  return (
    <div className='flex'>
      <SideBar />
      <div className=' w-full pt-4 pl-4'>
        <div className='flex justify-center gap-10 '>
          <h3>PJ Cadastradas</h3>
          <Button
            onClick={() => novoClientePF()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            + Cliente PF
          </Button>
          <Button
            onClick={() => novoClientePJ()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            + Cliente PJ
          </Button>
          <Button
            onClick={() => voltarPagina()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            Voltar
          </Button>
        </div>
        <div className='flex w-full items-center justify-center'>
          <ListaPJ clientesPJ={props.clientesPJ} />
        </div>
      </div>
    </div>
  );
}

export default PJPage;

export const getServerSideProps = async () => {
  const clientesPJ = await prisma.legalPerson.findMany({
    select: {
      id: true,
      name: true,
      whatsApp: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
  console.log(clientesPJ);

  return {
    props: { clientesPJ },
  };
};
