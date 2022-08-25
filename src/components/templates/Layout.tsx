import { css } from '@emotion/react';
import HomeIcon from '@mui/icons-material/Home';
import ShowChartTwoToneIcon from '@mui/icons-material/ShowChartTwoTone';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { ReadMore } from '@tomohiro3/bqpdv-ui-lib';
import Link from 'next/link';

function Layout(props: any) {
  const theme = useTheme();
  const isBigSize = useMediaQuery(theme.breakpoints.up('sm'));

  return (
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
