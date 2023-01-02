import { ProdutosCart } from '../../types';

type Props = {
  children: ProdutosCart;
};

export const ProdutoFiltrado = ({ children }: Props) => {
  if (!children) {
    return (
      <div>
        <p>nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className=' shadow-lg border-2 mb-2 rounded-md w-2/12'>
      <div className='w-full text-md'>
        <p className=''>
          <b className='flex items-center justify-center'>
            {children.produtoNome}
          </b>
        </p>
        <p className='flex items-center justify-center'>
          {' '}
          Price: ${children.preco}
        </p>
        <div className='flex items-center justify-center'>
          <button className='font-bold text-2xl'> - </button>
          <input className='w-8 mr-2 ml-2' />
          <button className='font-bold text-2xl'> + </button>
        </div>
      </div>
    </div>
    // <div className=' border  '>
    //   <ul className=''>
    //     <li className='flex justify-between items-center'>
    //       {children.produtoNome}
    //       <span className='pr-4 pb-2'>R$ {children.preco}</span>
    //       <span>
    //         <button className='border rounded-md  pl-2 pr-2 bg-blue-300'>
    //           +
    //         </button>
    //       </span>
    //       <span>Qtde: 1</span>
    //       <span>
    //         <button className='border rounded-md ml-4 pl-2 pr-2 bg-red-500'>
    //           -
    //         </button>
    //       </span>{' '}
    //     </li>{' '}
    //   </ul>
    // </div>
  );
};
