import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import FormClientesPJ from '../../../components/clientes/pj/FormClientePJ';
import SideBar from '../../../components/SideBar';

export default function CadastroClientesPJ() {
  const router = useRouter();

  function novoClientePF() {
    router.push('/clientes/pf/novo');
  }
  function listaPJ() {
    router.push('/clientes/pj/lista-pj');
  }

  function voltarPagina() {
    router.push('/clientes');
  }

  return (
    <div className='flex  bg-gray-200 '>
      <SideBar />
      <div className='w-4/5 pt-4 pl-4 bg-gray-200 '>
        <div className='flex justify-center gap-10 '>
          <h3>Cadastro de Clientes - PJ</h3>
          <Button
            onClick={() => listaPJ()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            Lista de PJ
          </Button>
          <Button
            onClick={() => novoClientePF()}
            variant='dark'
            size='sm'
            className='mb-2'
          >
            + Cliente PF
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
          <FormClientesPJ />
        </div>
      </div>
    </div>
  );
}
