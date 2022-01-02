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
  markets: [],
  industries: [],
  valueOrGrowth: null,
  isPriceShiftable: null,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_MARKET':
      return { ...state, markets: [...state.markets, action.payload] };
    case 'DELETE_MARKET':
      return { ...state, markets: state.markets.filter((market: string) => market !== action.payload) };
    case 'SET_INDUSTRY':
      return { ...state, industries: [...state.industries, action.payload] };
    case 'DELETE_INDUSTRY':
      return { ...state, industries: state.industries.filter((industry: string) => industry !== action.payload) };
    case 'SET_VALUEORGROWTH':
      return { ...state, valueOrGrowth: state.valueOrGrowth === action.paylaod ? null : action.payload };
    case 'SET_IS_PRICESHIFTABLE':
      return { ...state, valueOrGrowth: state.valueOrGrowth === action.paylaod ? null : action.payload };
    default:
      return state;
  }
}

function CustomApp({ Component, pageProps, data }: CustomAppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
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
