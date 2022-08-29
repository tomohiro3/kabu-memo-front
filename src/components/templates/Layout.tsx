import { css } from '@emotion/react';
import Head from 'next/head';
import { BREAK_POINT } from '../../constants/style'; // themingする
import MenuBar from '../modules/MenuBar';
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
        {/* divで囲ってレイアウトしやすくした方が良い気がするが、MenuBarでposition:fixedを持っているため不可
        Layoutでpositionも決めるべき？MenuBarの表示位置を切り替える機能を作るとなったらそうする？ */}
        <MenuBar />
        <main>{props.children}</main>
      </div>
    </>
  );
}

export default Layout;

// todo
// モバイル時のMenuBarの高さをべたで書いてしまっている
// LayoutからMenuBarにheightを渡すようにする？
const menuBarWidth = '60px';
const container = css`
  & > main {
    width: calc(100% - ${menuBarWidth});
    margin-left: ${menuBarWidth};
    padding: 8px 10px;
  }

  @media (max-width: ${BREAK_POINT.medium}px) {
    & > main {
      height: calc(100% - 50px});
      margin-bottom: 50px;
      margin-left: unset;
    }
  }
`;
