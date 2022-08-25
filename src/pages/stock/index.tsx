import { css } from '@emotion/react';
import { Suspense } from 'react';
import SkeletonCard from '../../components/modules/SkeletonCard';
import Card from '../../containers/stock/Card';
import StockInteractor from '../../interactors/stock/interactor';
import { StocksApiResponse } from '../../types/stock';

function Stock({ stocks }: { stocks: StocksApiResponse[] }) {
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
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, 320px);
        grid-template-rows: auto;
        gap: 10px;
      `}
    >
      {stocks.map((stock) => (
        <Card key={stock.code} stock={stock} />
      ))}
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