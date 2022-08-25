// todo
// getterとかプロパティ変換とかが必要になりそうならtypesではなくmodelsにするかも
import { Dict, Digit } from './lib';

type StockCode = `${Digit}${Digit}${Digit}${Digit}`;

// todo
// market, industry33, group, valueOrGrowthのtyping追加する
export type StocksApiResponse = {
  code: StockCode;
  name: string;
  market: string;
  industry33: string;
  group: string | null;
  valueOrGrowth: string | null;
  isProductPriceShiftable: boolean | null;
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
