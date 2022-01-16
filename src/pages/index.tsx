import Grid from '@mui/material/Grid';
import type { NextPage } from 'next';
import StockCard from '../components/organisms/StockCard';
import { StocksApiResponse } from '../types/api';
import { Dict } from '../types/lib';
import { hasDuplicateElement } from '../utils/lib/array-lib';

type Props = {
  searchFilters: {
    code: string;
    name: string;
    markets: string[];
    groups: string[];
    industries: string[];
    valueOrGrowth: null | 'バリュー' | 'グロース';
    isProductPriceShiftable: null | boolean;
    parentCompany: string | null;
    groupCompany: string | null;
    shareHolders: string[];
    customers: string[];
    partnerCompanies: string[];
    investingCompanies: string[];
    themes: string[];
    productCategories: string[];
    productUsecases: string[];
    freeNotes: Dict[];
  };
  initiallyFetchedData: StocksApiResponse[];
};
const Home: NextPage<Props> = (props) => {
  // todo
  // Need to optimize this find iteration
  const matchedStocks = props.initiallyFetchedData.filter((initiallyFetchedStock) => {
    let isMarketMatched = true;
    let isIndustryMathced = true;
    let isGroupMathced = true;
    let isShareHoldersMatched = true;
    let isCustomersMatched = true;
    let isPartnerCompaniesMatched = true;
    let isInvestingCompaniesMatched = true;
    let isThemesMatched = true;
    let isProductCategoriesMatched = true;
    let isProductUsecasesMatched = true;
    // let isFreeNoteKeyMatched = true;

    if (props.searchFilters.markets.length > 0) {
      isMarketMatched = props.searchFilters.markets.indexOf(initiallyFetchedStock.market) > -1;
    }
    if (props.searchFilters.industries.length > 0) {
      isIndustryMathced = props.searchFilters.industries.indexOf(initiallyFetchedStock.industry33) > -1;
    }
    if (props.searchFilters.groups.length > 0) {
      isGroupMathced = initiallyFetchedStock.group
        ? props.searchFilters.groups.indexOf(initiallyFetchedStock.group) > -1
        : props.searchFilters.groups.indexOf('None') > -1;
    }
    if (props.searchFilters.shareHolders.length > 0) {
      isShareHoldersMatched = hasDuplicateElement(props.searchFilters.shareHolders, initiallyFetchedStock.shareHolders);
    }
    if (props.searchFilters.customers.length > 0) {
      isCustomersMatched = hasDuplicateElement(props.searchFilters.customers, initiallyFetchedStock.customers);
    }
    if (props.searchFilters.partnerCompanies.length > 0) {
      isPartnerCompaniesMatched = hasDuplicateElement(
        props.searchFilters.partnerCompanies,
        initiallyFetchedStock.partnerCompanies
      );
    }
    if (props.searchFilters.investingCompanies.length > 0) {
      isInvestingCompaniesMatched = hasDuplicateElement(
        props.searchFilters.investingCompanies,
        initiallyFetchedStock.investingCompanies
      );
    }
    if (props.searchFilters.themes.length > 0) {
      isThemesMatched = hasDuplicateElement(props.searchFilters.themes, initiallyFetchedStock.themes);
    }
    if (props.searchFilters.productCategories.length > 0) {
      isProductCategoriesMatched = hasDuplicateElement(
        props.searchFilters.productCategories,
        initiallyFetchedStock.productCategories
      );
    }
    if (props.searchFilters.productUsecases.length > 0) {
      isProductUsecasesMatched = hasDuplicateElement(
        props.searchFilters.productUsecases,
        initiallyFetchedStock.productUsecases
      );
    }
    return (
      // Need to stop finding when code or name is matched
      // Or make another iteration for it and prioritize it
      initiallyFetchedStock.code == props.searchFilters.code ||
      initiallyFetchedStock.name === props.searchFilters.name ||
      initiallyFetchedStock.valueOrGrowth == props.searchFilters.valueOrGrowth ||
      initiallyFetchedStock.isProductPriceShiftable === props.searchFilters.isProductPriceShiftable ||
      initiallyFetchedStock.parentCompany == props.searchFilters.parentCompany ||
      initiallyFetchedStock.groupCompany === props.searchFilters.groupCompany ||
      (isMarketMatched &&
        isIndustryMathced &&
        isGroupMathced &&
        isShareHoldersMatched &&
        isCustomersMatched &&
        isPartnerCompaniesMatched &&
        isInvestingCompaniesMatched &&
        isThemesMatched &&
        isProductCategoriesMatched &&
        isProductUsecasesMatched)
    );
  });

  return (
    <>
      <Grid container spacing={2}>
        {matchedStocks.map((stock) => (
          <Grid item key={stock.name} xs={12} md={6} lg={4}>
            <StockCard {...stock} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
