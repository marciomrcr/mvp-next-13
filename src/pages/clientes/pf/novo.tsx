import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import FormClientesPf from '../../../components/clientes/pf/FormClientesPf';
import SideBar from '../../../components/SideBar';

export default function CadastroClientesPF() {
  const router = useRouter();

  function novoClientePJ() {
    router.push('/clientes/pj/novo');
  }

  function voltarPagina() {
    router.push('/clientes');
  }

  return (
    <div className='flex  bg-gray-200 '>
      <SideBar />
      <div className='w-4/5 pt-4 pl-4 bg-gray-200 '>
        <div className='flex justify-center gap-10 '>
          <h3>Cadastro de Clientes - PF</h3>
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
        <div className='flex items-center justify-center'>
          <FormClientesPf />
        </div>
      </div>
    </div>
  );
}
