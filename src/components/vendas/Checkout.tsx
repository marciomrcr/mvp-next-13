import { useState } from 'react';
import { ProdutosCart } from '../../types';
import { ProdutosFiltrados } from '../produtos/ProdutosFiltrados';

type Props = {
  produtos: ProdutosCart[];
};

export const Checkout = (props: Props) => {
  const [busca, setBusca] = useState('');

  function handleBuscaFiltro(novaBuscaFiltrada: string) {
    setBusca(novaBuscaFiltrada);
  }

  const buscaFiltradaLowerCase = busca.trim().toLowerCase();

  const buscaFiltrada =
    buscaFiltradaLowerCase.length >= 3
      ? props.produtos.filter(({ produtoNome }) => {
          return produtoNome
            .toLocaleLowerCase()
            .includes(buscaFiltradaLowerCase);
        })
      : props.produtos;

  return (
    <div>
      <form>
        <label>
          Busca:
          <input
            className=' ml-2 mb-2 pl-2 rounded-md'
            type='text'
            value={busca}
            onChange={(e) => handleBuscaFiltro(e.target.value)}
            autoFocus
            name='name'
          />
        </label>
      </form>
      {buscaFiltrada.length == props.produtos.length ? (
        <div>Lista de Produtos</div>
      ) : (
        <ProdutosFiltrados>{buscaFiltrada}</ProdutosFiltrados>
      )}
    </div>
  );
};
