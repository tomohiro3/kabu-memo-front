import Grid from '@mui/material/Grid';
import type { NextPage } from 'next';
import StockCard from '../components/organisms/StockCard';
import { Dict } from '../types/lib';

type Props = {
  searchFilters: {
    code: string;
    name: string;
    markets: string[];
    industries: string[];
    valueOrGrowth: null | 'value' | 'growth';
    isPriceShiftable: null | boolean;
  };
  initiallyFetchedData: Dict;
};
const Home: NextPage<Props> = (props) => {
  const { code, name, markets, industries, valueOrGrowth, isPriceShiftable } = { ...props.searchFilters };
  // const code = props.searchFilters.code;
  // const name = props.searchFilters.name;
  // const markets = props.searchFilters.markets;
  // const industries = props.searchFilters.industries;
  // const valueOrGrowth = props.searchFilters.valueOrGrowth;
  // const isPriceShiftable = props.searchFilters.isPriceShiftable;

  // todo
  // Need to optimize this find iteration
  const matchedStocks = props.initiallyFetchedData.filter((initiallyFetchedStock: any) => {
    let isMarketMatched = true;
    let isIndustryMathced = true;
    // let isValueOrGrowthMatched = false;
    // let isPriceShiftableMatched = false;
    if (markets.length > 0) {
      isMarketMatched = markets.indexOf(initiallyFetchedStock.market) > -1;
    }
    if (industries.length > 0) {
      isIndustryMathced = industries.indexOf(initiallyFetchedStock.industry_33) > -1;
    }
    // if (initiallyFetchedStock.valueOrGrowth !== undefined) {
    //   isValueOrGrowthMatched = initiallyFetchedStock.valueOrGrowth == valueOrGrowth;
    // }
    // if (initiallyFetchedStock.isPriceShiftable !== undefined) {
    //   isPriceShiftableMatched = initiallyFetchedStock.isPriceShiftable == isPriceShiftable;
    // }
    return (
      // Need to stop finding when code or name is matched
      // Or make another iteration for it and prioritize it
      initiallyFetchedStock.code == code ||
      initiallyFetchedStock.name === name ||
      (isMarketMatched && isIndustryMathced)
      // (markets.indexOf(initiallyFetchedStock.market) > -1 &&
      //   industries.indexOf(initiallyFetchedStock.industry_33) > -1 &&
      //   isValueOrGrowthMatched &&
      //   isPriceShiftableMatched)
    );
  });

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
