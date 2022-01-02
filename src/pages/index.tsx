import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import StockCard from '../components/organisms/StockCard';

const Home: NextPage = (props: any) => {
  const code = props.initialState.code;
  const name = props.initialState.name;
  const market = props.initialState.market;

  const matchedStocks = props.initialData.filter(
    (stock: any) => stock.code == code || stock.name === name || stock.market === market
  );
  return (
    <>
      <Grid container spacing={2}>
        {matchedStocks.map((data: any) => (
          <Grid item key={data.name} xs={12} md={6} lg={4}>
            <StockCard {...data} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
