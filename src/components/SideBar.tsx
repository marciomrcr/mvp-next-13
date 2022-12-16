import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CategoryIcon from '@mui/icons-material/Category';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TaskIcon from '@mui/icons-material/Task';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className=' md:w-3/12 w-3/12 lg:w-auto h-screen bg-slate-800'>
      <div className=' border-b py-3 mt-1 flex justify-around '>
        <Link href={'/'}>
          <Image src={'/aimee.png'} alt='Logo Aimée ' width={30} height={40} />
        </Link>
      </div>
      <div className='p-3'>
        <div>
          <h1 className='text-gray-200 h-4 lg:text-xl'>Menu</h1>

          <div className='h-10'>
            <Link href={'/vendas'} className='text-decoration-none'>
              <div className='flex p-3 text-gray-200  space-x-2 0  hover:text-blue-200  cursor-pointer  '>
                <MonetizationOnIcon className='text-gray-200' />
                <p className='text-gray-200  '>Vendas</p>
              </div>
            </Link>
          </div>

          <div className='h-10'>
            <Link href={'/receitas'} className='text-decoration-none'>
              <div className='flex p-3 text-gray-200  space-x-2 0  hover:text-blue-200  cursor-pointer  '>
                <ArrowUpwardIcon className='text-gray-200' />
                <p className='text-gray-200  '>Receitas</p>
              </div>
            </Link>
          </div>
          <div className='h-10'>
            <Link href={'/despesas'} className='text-decoration-none'>
              <div className='flex p-3 text-gray-200  space-x-2 0  hover:text-blue-200  cursor-pointer  '>
                <ArrowDownwardIcon className='text-gray-200' />
                <p className='text-gray-200  '>Despesas</p>
              </div>
            </Link>
          </div>
          <div className='h-10'>
            <Link href={'/compras'} className='text-decoration-none'>
              <div className='flex p-3 text-gray-200  space-x-2 0  hover:text-blue-200  cursor-pointer  '>
                <ShoppingCartIcon className='text-gray-200' />
                <p className='text-gray-200  '>Compras</p>
              </div>
            </Link>
          </div>
          <div className='h-10'>
            <Link href={'/estoque'} className='text-decoration-none'>
              <div className='flex p-3 text-gray-200  space-x-2 0  hover:text-blue-200  cursor-pointer  '>
                <ReplayCircleFilledIcon className='text-gray-200' />
                <p className='text-gray-200 text '>Estoque</p>
              </div>
            </Link>
          </div>
        </div>

        <h1 className='text-gray-200 lg:text-xl mt-2 mb-0'>Cadastros</h1>
        <div className='h-10 '>
          <Link href={'/produtos'} className='text-decoration-none'>
            <div className='flex p-3 text-gray-200   space-x-2 0  hover:text-blue-200  cursor-pointer'>
              <ShoppingBasketIcon className='text-gray-200' />
              <p className='text-gray-200 '>Produtos</p>
            </div>
          </Link>
        </div>
        <div className='h-10'>
          <Link href={'/categorias'} className='text-decoration-none'>
            <div className='flex p-3 text-gray-200  space-x-2 0  hover:text-blue-200  cursor-pointer  '>
              <CategoryIcon className='text-gray-200' />
              <p className='text-gray-200  '>Categorias</p>
            </div>
          </Link>
        </div>
        <div className='h-10'>
          <Link href={'/marcas'} className='text-decoration-none'>
            <div className='flex p-3 text-gray-200  space-x-2  cursor-pointer  '>
              <TaskIcon className='text-gray-200' />
              <p className='text-gray-200  '>Marcas</p>
            </div>
          </Link>
        </div>
        <div className='h-10'>
          <Link href={'/clientes'} className='text-decoration-none'>
            <div className='flex p-3 text-gray-200  space-x-2  cursor-pointer  '>
              <PersonAddIcon className='text-gray-200' />
              <p className='text-gray-200  '>Clientes</p>
            </div>
          </Link>
        </div>
        <div className='h-10'>
          <Link href={'/fornecedores'} className='text-decoration-none'>
            <div className='flex p-3 text-gray-200  space-x-2 0  hover:text-blue-200  cursor-pointer  '>
              <DonutLargeIcon className=' c' />
              <p className=' '>Fornecedores</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
