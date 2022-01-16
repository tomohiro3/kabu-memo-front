import { Dict } from './lib';

export type StocksApiResponse = {
  code: string;
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
