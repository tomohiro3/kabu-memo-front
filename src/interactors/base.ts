import { MyHttpRequester, IMyHttpRequester } from '../lib/http-requester';

export class BaseInteractor<T = unknown> {
  protected readonly interactor: IMyHttpRequester<T>;
  constructor(endpoint?: string, Requester = MyHttpRequester) {
    this.interactor = new Requester(endpoint);
  }
  abort(msg?: string) {
    this.interactor.abort(msg);
  }
}
