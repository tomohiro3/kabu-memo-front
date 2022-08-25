import { css } from '@emotion/react';
import HomeIcon from '@mui/icons-material/Home';
import ShowChartTwoToneIcon from '@mui/icons-material/ShowChartTwoTone';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
// import { ReadMore } from '@tomohiro3/bqpdv-ui-lib';
import Link from 'next/link';

// todo
// seoコンポネント作る
function Layout(props: any) {
  const theme = useTheme();
  const isBigSize = useMediaQuery(theme.breakpoints.up('sm'));

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
        <div css={activityBar(isBigSize)}>
          <div css={links(isBigSize)}>
            <Link href="/">
              <IconButton aria-label="Home" disableRipple>
                <HomeIcon fontSize="large" sx={{ p: 0 }} />
              </IconButton>
            </Link>
            <Link href="/stock">
              <IconButton aria-label="Stock Page" disableRipple>
                <SummarizeTwoToneIcon fontSize="large" sx={{ p: 0 }} />
              </IconButton>
            </Link>
            <IconButton aria-label="Chart Page" size="large" disableRipple>
              <ShowChartTwoToneIcon fontSize="large" sx={{ p: 0 }} />
            </IconButton>
            {/* <ReadMore /> */}
          </div>
        </div>
        <main css={main(isBigSize)}>{props.children}</main>
      </div>
    </>
  );
}

export default Layout;

const activityBarWidthHeight = '60px';
const container = css({
  display: 'flex',
  height: '100vh',
});
const activityBar = (isBig: boolean) =>
  css`
    background-color: #eee;
    position: fixed;
    ${isBig
      ? `
      width: ${activityBarWidthHeight};
      height: 100%;
      padding: 8px 10px;
      `
      : `
      bottom: 0;
      width: 100%;
      height: ${activityBarWidthHeight};
      padding: 10px 8px;
      z-index: 2;
    `}
  `;
const links = (isBig: boolean) => css`
  display: flex;
  justify-content: center;
  ${isBig
    ? `
    flex-direction: column;
    & :not(:last-child): {
      margin-bottom: 10px,
      `
    : `
    align-items: base;
    justify-content: space-between;
    height: 100%;
     & :not(:last-child): {
        margin-right: 8px,
   `}
`;
const main = (isBigSize: boolean) =>
  css(`
  padding: 8px 10px;
  ${
    isBigSize
      ? `
    width: calc(100% - ${activityBarWidthHeight});
    margin-left: ${activityBarWidthHeight};
      `
      : `
    height: calc(100% - ${activityBarWidthHeight});
    margin-bottom: ${activityBarWidthHeight};
   `
  }`);
