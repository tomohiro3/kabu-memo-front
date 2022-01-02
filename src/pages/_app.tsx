import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useReducer } from 'react';
import Layout from '../components/templates/Layout';

type CustomAppProps = AppProps & {
  data: Array<{ [key: string]: any }>;
};

const initialState = {
  code: '',
  name: '',
  market: '',
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
}

function CustomApp({ Component, pageProps, data }: CustomAppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Layout initialData={data} dispatch={dispatch}>
      <Component initialData={data} initialState={state} {...pageProps} />
    </Layout>
  );
}

CustomApp.getInitialProps = async () => {
  const res = await fetch('http://localhost:5000/stocks');
  const json = await res.json();
  return { data: json.res };
};

export default CustomApp;
