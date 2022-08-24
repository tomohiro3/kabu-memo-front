import axiosBase, { AxiosResponse, AxiosPromise, Method } from 'axios';
import { Dict } from '../types/lib';

type GetArg = { url?: string; params?: Dict };
type PatchArg = { url?: string; id?: number; data?: Dict };
type PostArg = { url?: string; data?: Dict };
type FmHttpResponse<Data = any, Error = any> = {
  data: Data | undefined;
  error: Error | undefined;
};
export interface IMyHttpRequester<T> {
  get: <U = T, S = string>(arg: GetArg) => Promise<FmHttpResponse<U, S>>;
  patch: <U = T, S = string>(arg: PatchArg) => Promise<FmHttpResponse<U, S>>;
  post: <U = T, S = string>(arg: PostArg) => Promise<FmHttpResponse<U, S>>;
  put: <U = T, S = string>({ params }: Dict) => Promise<FmHttpResponse<U, S>>;
  delete: <U = T, S = string>(id: number) => Promise<FmHttpResponse<U, S>>;
  fetchAll: <U extends any[], S = string>(args: GetArg[]) => Promise<FmHttpResponse<U, S>>;
  abort: (message?: string) => void;
}

export class MyHttpRequester<T> implements IMyHttpRequester<T> {
  // memo
  // 複数のPromiseがawaitされて直列実行されている場合、キャンセルできるのはキャンセル時に実行されているPromiseのみで、
  // 後続のPromiseはキャンセルされない
  // CancelTokenは並列に実行されているPromiseに対して有効

  // 全リクエスト共通のキャンセルトークン生成
  constructor(private endpoint?: string, private axios = axiosBase, private source = axios.CancelToken.source()) {}

  get<U = T>(arg: GetArg) {
    return this.interactWithErrorHandle<U>(() => this.request('get', arg));
  }
  patch<U = T>(arg: PatchArg) {
    return this.interactWithErrorHandle<U>(() =>
      this.request('patch', { url: `${arg.url || this.endpoint}${arg.id}/`, data: arg.data })
    );
  }
  post<U = T>(arg: PostArg) {
    return this.interactWithErrorHandle<U>(() => this.request('post', arg));
  }
  put<U = T>({ params }: Dict) {
    return this.interactWithErrorHandle<U>(() => this.request('put', { params }));
  }
  delete<U = T>(id: number) {
    return this.interactWithErrorHandle<U>(() => this.request('delete', { url: `${this.endpoint}${id}/` }));
  }
  fetchAll<U extends any[]>(args: GetArg[]) {
    return this.interactWithErrorHandle<U>(() => Promise.all(args.map((arg) => this.request('get', arg))));
  }
  abort(message = 'コンポネントがアンマウントされたためリクエストをキャンセルしました。') {
    this.source.cancel(message);
    // 使用済みトークンがリクエストに付与されているとリクエストを投げられなくなる
    // よってキャンセル実行後は毎回新しいトークンを生成する
    this.source = this.axios.CancelToken.source();
  }

  // 一つの型引数KでfetchAll（）とそれ以外の関数の引数を定義したい
  // Promise.all()用に() => Promise<Awaited<AxiosResponse<K[number]>>[]>としたい。
  // 方法模索
  private async interactWithErrorHandle<K>(
    promise: (() => AxiosPromise<K>) | (() => Promise<Awaited<AxiosResponse>[]>)
  ): Promise<FmHttpResponse<K>> {
    try {
      const r = await promise();
      if (Array.isArray(r)) return { data: r.map((axiosRes) => axiosRes.data) as unknown as K, error: undefined };
      else return { data: r.data, error: undefined };
    } catch (err: any) {
      if (this.axios.isCancel(err)) {
        console.log(err.message);
      } else {
        const msg = this.isError(err);
        if (msg) return { data: undefined, error: msg };
      }
      return { data: undefined, error: undefined };
    }
  }

  private request<K>(method: Method, config?: { params?: Dict; data?: Dict; url?: string }): AxiosPromise<K> {
    const { params, data, url } = { ...config };

    return this.axios({
      url: url || this.endpoint,
      method,
      params,
      data,
      cancelToken: this.source.token,
    });
  }

  // todo
  // isErrorだが返り値はbooleanでないため名前の変更検討
  private isError(err: any) {
    let error: { code: string | null; status: number | null; message: string };
    if (err.response) {
      error = {
        code: err.response.data.code,
        status: err.response.data.status,
        message: err.response.data.message || err.response.statusText || 'NWを確認してください',
      };
    } else if (err.request) {
      error = {
        code: null,
        status: 500,
        message: '予期せぬエラーが発生しました',
      };
    } else {
      error = {
        code: null,
        status: null,
        message: 'クライアントエラー',
      };
    }

    return error.message;
  }
}
