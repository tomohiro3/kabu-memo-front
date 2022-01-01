import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/templates/Layout';

type CustomAppProps = AppProps & {
  data: Array<{ [key: string]: any }>;
};

function CustomApp({ Component, pageProps, data }: CustomAppProps) {
  return (
    <Layout initialData={data}>
      <Component initialData={data} {...pageProps} />
    </Layout>
  );
}

CustomApp.getInitialProps = async () => {
  const res = await fetch('http://localhost:5000/stocks');
  const json = await res.json();
  return { data: json.res };
};

export default CustomApp;
