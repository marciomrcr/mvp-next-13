import { ProdutosCart } from '../../types';
import { ProdutoFiltrado } from './ProdutoFiltrado';

type Props = {
  children: ProdutosCart[];
};
export const ProdutosFiltrados = ({ children }: Props) => {
  return (
    <div>
      <h5>{children.length} Produto(s)</h5>
      {children.map((produto) => {
        return <ProdutoFiltrado key={produto.id}>{produto}</ProdutoFiltrado>;
      })}
    </div>
  );
};
