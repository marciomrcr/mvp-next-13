import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function FormClientePJ() {
  const router = useRouter();

  function voltarPagina() {
    router.push('/clientes');
  }

  function listaPJ() {
    router.push('/clientes/pj/lista-pj');
  }

  function clearForm() {
    setClientePJ({
      name: '',
      contactName: '',
      cnpj: '',
      whatsApp: '',
      phone: '',
      email: '',
      instagram: '',
      stateRegistration: '',
      pixkey: '',
      creditLimit: 0,
    });
  }

  const [clientePJ, setClientePJ] = useState({
    name: '',
    contactName: '',
    cnpj: '',
    whatsApp: '',
    phone: '',
    email: '',
    instagram: '',
    stateRegistration: '',
    pixkey: '',
    creditLimit: 0,
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setClientePJ({
      ...clientePJ,
      [name]: value,
    });

  const criarPessoaPJ = async (clientePJ: ClientePJ) => {
    try {
      await fetch('/api/clientes/cadastro/pj', {
        body: JSON.stringify(clientePJ),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      return alert('PJ cadastrada com sucesso');
    } catch (error) {
      console.log(error);
      alert('PJ não foi salva');
    }
  };

  const loadClientePJ = async (id: string) => {
    const res = await fetch(`/api/clientes/cadastro/pj/${id}`);
    const clientePJ = await res.json();
    setClientePJ({
      name: clientePJ.name,
      whatsApp: clientePJ.whatsApp,
      phone: clientePJ.phone,
      email: clientePJ.email,
      contactName: clientePJ.contactName,
      cnpj: clientePJ.cnpj,
      instagram: clientePJ.instagram,
      stateRegistration: clientePJ.stateRegistration,
      pixkey: clientePJ.pixkey,
      creditLimit: clientePJ.creditLimit,
    });
  };

  const updatePessoaPJ = async (id: string, clientePJ: ClientePJ) => {
    await fetch(`/api/clientes/cadastro/pj/${id}`, {
      body: JSON.stringify(clientePJ),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    return alert('PJ alterada com sucesso');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === 'string') {
        updatePessoaPJ(router.query.id, clientePJ);
      } else {
        await criarPessoaPJ(clientePJ);
      }
      voltarPagina();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') loadClientePJ(router.query.id);
    console.log(router.query.id);
  }, [router.query]);

  return (
    <>
      <div className='flex justify-center items-center box-shadow: 5px 5px 8px rgb(0 0 0 / 0.212)'>
        <form
          onSubmit={handleSubmit}
          className='w-4/5 flex flex-col  justify-center items-center bg-slate-50 p-2 '
        >
          <div className='flex flex-wrap justify-between py-4 '>
            <div className='flex flex-col mb-4'>
              <label htmlFor='name'>Nome</label>
              <input
                type='text'
                name='name'
                value={clientePJ.name}
                placeholder='Digite o nome da empresa'
                onChange={handleChange}
                required
                className='w-80 mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    '
              />
            </div>
            <div>
              <label htmlFor='cnpj'>CNPJ</label>
              <input
                value={clientePJ.cnpj}
                onChange={handleChange}
                type='text'
                name='cnpj'
                placeholder='somente números'
                className='mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            '
              />
            </div>
            <div>
              <label htmlFor='stateRegistration'>Inscrição Estadual</label>
              <input
                value={clientePJ.stateRegistration}
                onChange={handleChange}
                type='text'
                name='stateRegistration'
                placeholder='Somente números'
                className='mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            '
              />
            </div>

            <div>
              <label htmlFor='phone'>Telefone</label>
              <input
                type='tel'
                name='phone'
                value={clientePJ.phone}
                onChange={handleChange}
                placeholder='(xx) xxxxx-xxxx'
                required
                className='mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    '
              />
            </div>
            <div>
              <label htmlFor='whatsApp'>WhatsApp</label>
              <input
                value={clientePJ.whatsApp}
                onChange={handleChange}
                type='tel'
                name='whatsApp'
                placeholder='(xx) xxxxx-xxxx'
                className='mt-1 block  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    '
              />
            </div>

            <div>
              <label htmlFor='email'>Email</label>
              <input
                value={clientePJ.email}
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='empresa@exemplo.com.br'
                className='mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            '
              />
            </div>

            <div>
              <label htmlFor='contactName'>Contato</label>
              <input
                value={clientePJ.contactName}
                onChange={handleChange}
                type='text'
                name='contactName'
                placeholder='Número da identidade'
                className='mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            '
              />
            </div>

            <div className='mt-4'>
              <label htmlFor='instagram'>Instagram</label>
              <input
                value={clientePJ.instagram}
                onChange={handleChange}
                type='text'
                name='instagram'
                placeholder='@meuInstagram'
                className='mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            '
              />
            </div>

            <div className='mt-4'>
              <label htmlFor='pixkey'>Chave PIX</label>
              <input
                value={clientePJ.pixkey}
                onChange={handleChange}
                type='text'
                name='pixkey'
                placeholder='Digite a chave PIX'
                className='mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            '
              />
            </div>
            <div className='mt-4'>
              <label htmlFor='creditLimit'>Limite de crédito?</label>
              <input
                value={clientePJ.creditLimit}
                onChange={handleChange}
                type='number'
                name='creditLimit'
                placeholder='Número da identidade'
                className='mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            '
              />
            </div>
          </div>

          <div className='flex justify-center gap-8'>
            {router.query.id ? (
              <Button variant='dark' size='sm' className='mb-2' type='submit'>
                Alterar
              </Button>
            ) : (
              <Button variant='dark' size='sm' className='mb-2' type='submit'>
                Salvar
              </Button>
            )}
            <Button onClick={listaPJ} variant='dark' size='sm' className='mb-2'>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
