import { css } from '@emotion/react';
import ShowChartTwoToneIcon from '@mui/icons-material/ShowChartTwoTone';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';

function Layout(props: any) {
  const theme = useTheme();
  const isBigSize = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <div css={container}>
      <div css={activityBar(isBigSize)}>
        <div css={links(isBigSize)}>
          <IconButton
            aria-label="to-stock"
            disableRipple
            // LinkComponent={<Link href="/stock" />}
          >
            <SummarizeTwoToneIcon fontSize="large" sx={{ p: 0 }} />
          </IconButton>
          <IconButton aria-label="to-chart" size="large" disableRipple>
            <ShowChartTwoToneIcon fontSize="large" sx={{ p: 0 }} />
          </IconButton>
        </div>
      </div>
      {/* {isBigSize ? <Divider orientation="vertical" /> : null} */}
      <main css={main}>{props.children}</main>
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
    ${isBig
      ? `
      min-width: ${activityBarWidthHeight};
      padding: 8px 10px;
      overflow-y: auto;
      `
      : `
      position: fixed;
      bottom: 0;
      width: 100%;
      height: ${activityBarWidthHeight};
      padding: 10px 8px;
      overflow-x: auto;
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
    height: 100%;
    align-items: base;
     & :not(:last-child): {
        margin-right: 8px,
   `}
`;

const main = css({
  display: 'flex',
  padding: '8px 10px',
  width: `calc(100% - ${activityBarWidthHeight}px)`,
});
