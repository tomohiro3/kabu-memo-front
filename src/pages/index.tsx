import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import StockCard from '../components/organisms/StockCard';

const Home: NextPage = (props: any) => {
  return (
    <>
      <Grid container spacing={2}>
        {props.initialData.map((data: any) => (
          <Grid item key={data.name} xs={12} md={6} lg={4}>
            <StockCard {...data} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
