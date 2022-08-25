import { StocksApiResponse } from '../../types/stock';
import { BaseInteractor } from '../base';

type GetArg = any;

class StockInteractor extends BaseInteractor<StocksApiResponse> {
  constructor() {
    super('stocks');
  }

  search(params?: GetArg) {
    return this.interactor.get<StocksApiResponse[]>(params);
  }
}

export default new StockInteractor();
