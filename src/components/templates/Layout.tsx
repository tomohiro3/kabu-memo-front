import { css } from '@emotion/react';
import Head from 'next/head';
import { BREAK_POINT } from '../../constants/style'; // themingする
import MenuBar from '../organisims/MenuBar';
// import { ReadMore } from '@tomohiro3/bqpdv-ui-lib';

// todo
// seoコンポネント作る
function Layout(props: any) {
  return (
    <>
      <Head>
        <title>KABUMEMO</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="description" content="default description" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content="default title" />
        <meta property="og:description" content="og default description" />
        <meta property="og:url" content="og default url" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="og default site name" />
      </Head>
      <div css={container}>
        <div>
          <MenuBar />
        </div>
        <main>{props.children}</main>
      </div>
    </>
  );
}

export default Layout;

// todo
// メニューバーの左右上下表示位置を切り替えられるようにする？
const menuBarWidth = '60px';
const menuBarHeight = '50px';
const container = css`
  & > div {
    height: 100%;
    position: fixed;
    width: ${menuBarWidth};
    z-index: 2;
  }

  & > main {
    width: calc(100% - ${menuBarWidth});
    margin-left: ${menuBarWidth};
    padding: 8px 10px;
  }

  @media (max-width: ${BREAK_POINT.medium}px) {
    & > div {
      bottom: 0;
      width: 100%;
      height: ${menuBarHeight};
    }

    & > main {
      width: 100%;
      height: calc(100% - ${menuBarHeight});
      margin-bottom: ${menuBarHeight};
      margin-left: unset;
    }
  }
`;
