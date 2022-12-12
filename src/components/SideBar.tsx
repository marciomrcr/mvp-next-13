import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TaskIcon from '@mui/icons-material/Task';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className='md:w-3/12 w-3/12 lg:w-auto h-screen'>
      <div className=' border-b py-3 mt-1 flex justify-around '>
        <p className='text-xl  font-semibold'>Aliane</p>
        <p>|</p>
        <p className='text-gray-400 text-lg'>Logo</p>
      </div>
      <div className='p-4'>
        <div className=''>
          <h1 className='text-gray-400'>Menu</h1>
          <div className='h-10'>
            <div className='flex p-3 text-gray-700  space-x-2 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  '>
              <DonutLargeIcon className=' text-gray-300' />
              <p className=' '>Dashboard</p>
            </div>
          </div>
          <div className='h-10'>
            <div className='flex p-3 text-gray-700  space-x-2 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  '>
              <MonetizationOnIcon className='text-gray-300' />
              <p className='text-gray-600  '>Vendas</p>
            </div>
          </div>

          <div className='h-10'>
            <Link href={'/receitas'} className='text-decoration-none'>
              {' '}
              <div className='flex p-3 text-gray-700  space-x-2 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  '>
                <ArrowUpwardIcon className='text-gray-300' />
                <p className='text-gray-600  '>Receitas</p>
              </div>{' '}
            </Link>
          </div>
          <div className='h-10'>
            <div className='flex p-3 text-gray-700  space-x-2 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  '>
              <ArrowDownwardIcon className='text-gray-300' />
              <p className='text-gray-600  '>Despesas</p>
            </div>
          </div>
          <div className='h-10'>
            <div className='flex p-3 text-gray-700  space-x-2 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  '>
              <ShoppingCartIcon className='text-gray-300' />
              <p className='text-gray-600  '>Compras</p>
            </div>
          </div>
        </div>
        <div className=''>
          <h1 className='text-gray-400'>Estoque</h1>
          <div className='h-10'>
            <div className='flex p-3 text-gray-700  space-x-2 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer'>
              <ShoppingBasketIcon className='text-gray-300' />
              <p className='text-gray-600  '>Produtos</p>
            </div>
          </div>
          <div className=''>
            <div className='flex p-3 text-gray-700  space-x-2 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  '>
              <ReplayCircleFilledIcon className='text-gray-300' />
              <p className='text-gray-600  '>Estoque</p>
            </div>
          </div>
        </div>
        <div className=''>
          <h1 className='text-gray-400'>Cadastros</h1>
          <div className=''>
            <div className='h-10 flex p-3 text-gray-700  space-x-2 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  '>
              <PersonAddIcon className='text-gray-300' />
              <p className='text-gray-600  '>Clientes</p>
            </div>
            <div className='h-10 flex p-3 text-gray-700  space-x-2 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  '>
              <BusinessIcon className='text-gray-300' />
              <p className='text-gray-600  '>Fornecedores</p>
            </div>
            <Link href={'/categorias'} className='text-decoration-none'>
              <div className='h-10 flex p-3 text-gray-700  space-x-2 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  '>
                <CategoryIcon className='text-gray-300' />
                <p className='text-gray-600  '>Categorias</p>
              </div>
            </Link>
            <Link href={'/marcas'} className='text-decoration-none'>
              <div className='flex p-3 text-gray-700  space-x-2 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  '>
                <TaskIcon className='text-gray-300' />
                <p className='text-gray-600  '>Marcas</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
