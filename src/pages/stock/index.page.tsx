import { css } from '@emotion/react';
import { useState, Suspense } from 'react';
import SearchBox from '../../components/organisims/SearchBox';
import SkeletonCard from '../../components/organisims/SkeletonCard';
import StockInteractor from '../../interactors/stock/interactor';
import { StocksApiResponse } from '../../types/stock';
import Card from './Card';

// todo
// style
function Stock({ stocks }: { stocks: StocksApiResponse[] }) {
  const [keyword, setKeyword] = useState('');
  return (
    // <Suspense
    //   fallback={
    //     <>
    //       {Array.from({ length: 20 }, () => (
    //         <SkeletonCard />
    //       ))}
    //     </>
    //   }
    // >
    <div>
      <div>
        <SearchBox
          value={keyword}
          placeholder="銘柄名・コードを入力してください"
          onChange={(ev) => setKeyword(ev.target.value)}
          onSubmit={(ev) => {
            ev.preventDefault();
            console.log(keyword);
          }}
        />
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, 320px);
          grid-template-rows: auto;
          gap: 10px;
        `}
      >
        <div>
          {stocks.map((stock) => (
            <Card key={stock.code} stock={stock} />
          ))}
        </div>
      </div>
    </div>
    // </Suspense>
  );
}

export async function getStaticProps() {
  const { data, error } = await StockInteractor.search();
  if (data) {
    return { props: { stocks: data } };
  } else {
    console.error(error);
    return { notFound: true };
  }
}

export default Stock;
