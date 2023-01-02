type PropsProduto = {
  produto: {
    id?: string;
    produtoNome: string;
    preco: string;
    imagem?: string;
  };
};

const Produto = (produtoNome: string, preco: string) => {
  return (
    <div>
      {/* <Image src={'jaqueta.png'} alt={''} width={300} height={450} /> */}
      <div>
        <p>
          <b>{produtoNome}</b>
        </p>
        <p>R$ {preco}</p>
      </div>
    </div>
  );
};
export default Produto;
