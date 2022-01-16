import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useReducer } from 'react';
import Layout from '../components/templates/Layout';
import { StocksApiResponse } from '../types/api';

type CustomAppProps = AppProps & {
  data: StocksApiResponse[];
};

const initialSearchFiltersState = {
  code: '',
  name: '',
  markets: [],
  groups: [],
  industries: [],
  valueOrGrowth: null,
  isProductPriceShiftable: null,
  parentCompany: null,
  groupCompany: null,
  shareHolders: [],
  customers: [],
  partnerCompanies: [],
  investingCompanies: [],
  themes: [],
  productCategories: [],
  productUsecases: [],
  // free_notes:
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_STOCK_CODE_NAME':
      return { ...state, code: action.payload.code, name: action.payload.name };
    case 'SET_MARKET':
      return { ...state, markets: [...state.markets, action.payload] };
    case 'REMOVE_MARKET':
      return { ...state, markets: state.markets.filter((market: string) => market !== action.payload) };
    case 'SET_GROUP':
      return { ...state, groups: [...state.groups, action.payload] };
    case 'REMOVE_GROUP':
      return { ...state, groups: state.groups.filter((group: string) => group !== action.payload) };
    case 'SET_INDUSTRY':
      return { ...state, industries: [...state.industries, action.payload] };
    case 'REMOVE_INDUSTRY':
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
  const [state, dispatch] = useReducer(reducer, initialSearchFiltersState);
  return (
    <Layout initiallyFetchedData={data} dispatch={dispatch}>
      <Component initiallyFetchedData={data} searchFilters={state} {...pageProps} />
    </Layout>
  );
}

CustomApp.getInitialProps = async () => {
  const res = await fetch('http://localhost:5000/stocks');
  const json = await res.json();

  return { data: json.res };
};

export default CustomApp;
