import Router from 'next/router';
import { Button } from 'react-bootstrap';
import ListaClientePF from '../../components/clientes/pf/ListaClientePF';
import SideBar from '../../components/SideBar';
import prisma from '../../lib/prisma';
import { ClientePF } from '../../types';

type Props = {
  clientesPf: ClientePF[];
};

function ClientesPage(props: Props) {
  function novoClientePF() {
    Router.push('/clientes/pf/novo');
  }
  function novoClientePJ() {
    Router.push('/clientes/pj/novo');
  }

  return (
    <div className='flex'>
      <SideBar />
      <div className=' w-full pt-4 pl-4'>
        <div className='flex justify-center gap-10 '>
          <h3>Clientes Cadastrados</h3>
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
        </div>
        <div className='flex w-full items-center justify-center'>
          <ListaClientePF clientesPf={props.clientesPf} />
        </div>
      </div>
    </div>
  );
}

export default ClientesPage;

export const getServerSideProps = async () => {
  const clientesPf = await prisma.physicalPerson.findMany({
    select: {
      id: true,
      name: true,
      whatsApp: true,
      phone: true,
      identity: true,
      cpf: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
  console.log(clientesPf);

  return {
    props: { clientesPf },
  };
};
