import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ClientePF } from '../../../types';

export default function FormClientePF() {
  const router = useRouter();

  function voltarPagina() {
    router.push('/clientes');
  }

  const [clientePF, setClientePF] = useState({
    name: '',
    cpf: '',
    identity: '',
    whatsApp: '',
    phone: '',
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setClientePF({
      ...clientePF,
      [name]: value,
    });

  const criarPessoaPF = async (clientePF: ClientePF) => {
    try {
      await fetch('/api/clientes/cadastro/pf', {
        body: JSON.stringify(clientePF),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      return alert('Cliente cadastrado com sucesso');
    } catch (error) {
      console.log(error);
      alert('Cliente não foi salvo');
    }
  };

  const loadClientePF = async (id: string) => {
    const res = await fetch(`/api/clientes/cadastro/pf/${id}`);
    const clientePF = await res.json();
    setClientePF({
      name: clientePF.name,
      whatsApp: clientePF.whatsApp,
      phone: clientePF.phone,
      cpf: clientePF.cpf,
      identity: clientePF.identity,
    });
  };

  const updatePessoaPF = async (id: string, clientePF: ClientePF) => {
    await fetch(`/api/clientes/cadastro/pf/${id}`, {
      body: JSON.stringify(clientePF),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    return alert('Cliente alterado com sucesso');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === 'string') {
        updatePessoaPF(router.query.id, clientePF);
      } else {
        await criarPessoaPF(clientePF);
      }
      voltarPagina();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') loadClientePF(router.query.id);
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
              <label htmlFor='firstName'>Nome</label>
              <input
                type='text'
                name='name'
                value={clientePF.name}
                placeholder='Digite o nome'
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

            <div className='input-box'>
              <label htmlFor='number'>Telefone</label>
              <input
                type='tel'
                name='phone'
                value={clientePF.phone}
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
            <div className='input-box'>
              <label htmlFor='number'>WhatsApp</label>
              <input
                value={clientePF.whatsApp}
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

            <div className='input-box'>
              <label htmlFor='cpf'>CPF</label>
              <input
                value={clientePF.cpf}
                onChange={handleChange}
                type='text'
                name='cpf'
                placeholder='Digite somente números'
                className='mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            '
              />
            </div>

            <div className='input-box'>
              <label htmlFor='identity'>Identidade</label>
              <input
                value={clientePF.identity}
                onChange={handleChange}
                type='text'
                name='identity'
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

          <div className='continue-button'>
            {router.query.id ? (
              <Button variant='dark' size='sm' className='mb-2' type='submit'>
                Alterar
              </Button>
            ) : (
              <Button variant='dark' size='sm' className='mb-2' type='submit'>
                Salvar
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
