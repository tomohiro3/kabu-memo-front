import Grid from '@mui/material/Grid';
import type { NextPage } from 'next';
import StockCard from '../components/organisms/StockCard';
import { Dict } from '../types/lib';

type Props = {
  searchFilters: {
    code: string;
    name: string;
    markets: string[];
    groups: string[];
    industries: string[];
    valueOrGrowth: null | 'バリュー' | 'グロース';
    isPriceShiftable: null | boolean;
    parentCompany: string | null;
    groupCompany: string | null;
    shareHolders: string[];
    customers: string[];
    partnerCompanies: string[];
    investingCompanies: string[];
    theme: string[];
    productCategories: string[];
    productUsecases: string[];
    freeNotes: Dict[];
  };
  initiallyFetchedData: Dict;
};
const Home: NextPage<Props> = (props) => {
  // todo
  // Need to optimize this find iteration
  const matchedStocks = props.initiallyFetchedData.filter((initiallyFetchedStock: any) => {
    let isMarketMatched = true;
    let isIndustryMathced = true;
    let isGroupMathced = true;
    let isValueOrGrowthMatched = true;
    let isPriceShiftableMatched = true;
    let isParentCompanyMatched = true;
    let isGroupCompanyMatched = true;
    const isShareHoldersMatched = true;
    const isCustomersMatched = true;
    const isPartnerCompaniesMatched = true;
    const isInvestingCompaniesMatched = true;
    const isThemeMatched = true;
    const isProductCategoriesMatched = true;
    const isProductUsecasesMatched = true;
    // let isFreeNoteKeyMatched = true;

    if (props.searchFilters.markets.length > 0) {
      isMarketMatched = props.searchFilters.markets.indexOf(initiallyFetchedStock.market) > -1;
    }
    if (props.searchFilters.industries.length > 0) {
      isIndustryMathced = props.searchFilters.industries.indexOf(initiallyFetchedStock.industry_33) > -1;
    }
    if (props.searchFilters.groups.length > 0) {
      isGroupMathced = props.searchFilters.groups.indexOf(initiallyFetchedStock.group) > -1;
    }
    // ここから
    // 検索フィルターもAPIからのレスポンスも両方配列なのでマッチに判定方法を変更する必要がある。
    if (props.searchFilters.shareHolders.length > 0) {
      isMarketMatched = props.searchFilters.shareHolders.indexOf(initiallyFetchedStock.shareHolders) > -1;
    }
    if (props.searchFilters.customers.length > 0) {
      isIndustryMathced = props.searchFilters.customers.indexOf(initiallyFetchedStock.customers) > -1;
    }
    if (props.searchFilters.groups.length > 0) {
      isGroupMathced = props.searchFilters.groups.indexOf(initiallyFetchedStock.group) > -1;
    }
    if (props.searchFilters.markets.length > 0) {
      isMarketMatched = props.searchFilters.markets.indexOf(initiallyFetchedStock.market) > -1;
    }
    if (props.searchFilters.industries.length > 0) {
      isIndustryMathced = props.searchFilters.industries.indexOf(initiallyFetchedStock.industry_33) > -1;
    }
    if (props.searchFilters.groups.length > 0) {
      isGroupMathced = props.searchFilters.groups.indexOf(initiallyFetchedStock.group) > -1;
    }
    if (props.searchFilters.groups.length > 0) {
      isGroupMathced = props.searchFilters.groups.indexOf(initiallyFetchedStock.group) > -1;
    }
    // ここ四つはフロントもバックも初期値nullなのでこの判定は不要？
    // return内の判定もcode/nameとお同じ扱いにする？
    // つまり上部のlet hoge = trueも不要？
    if (initiallyFetchedStock.valueOrGrowth) {
      isValueOrGrowthMatched = initiallyFetchedStock.valueOrGrowth == props.searchFilters.valueOrGrowth;
    }
    if (initiallyFetchedStock.isPriceShiftable) {
      isPriceShiftableMatched = initiallyFetchedStock.isPriceShiftable == props.searchFilters.isPriceShiftable;
    }
    if (initiallyFetchedStock.valueOrGrowth) {
      isParentCompanyMatched = initiallyFetchedStock.valueOrGrowth == props.searchFilters.parentCompany;
    }
    if (initiallyFetchedStock.isPriceShiftable) {
      isGroupCompanyMatched = initiallyFetchedStock.isPriceShiftable == props.searchFilters.groupCompany;
    }
    return (
      // Need to stop finding when code or name is matched
      // Or make another iteration for it and prioritize it
      initiallyFetchedStock.code == props.searchFilters.code ||
      initiallyFetchedStock.name === props.searchFilters.name ||
      (isMarketMatched &&
        isIndustryMathced &&
        isGroupMathced &&
        isValueOrGrowthMatched &&
        isPriceShiftableMatched &&
        isParentCompanyMatched &&
        isGroupCompanyMatched)
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
