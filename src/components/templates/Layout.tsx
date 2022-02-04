import { css } from '@emotion/react';
import ShowChartTwoToneIcon from '@mui/icons-material/ShowChartTwoTone';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';

function Layout(props: any) {
  return (
    <div css={container}>
      <div css={activityBar}>
        <div css={buttons}>
          <IconButton
            sx={{ p: 0 }}
            aria-label="delete"
            size="large"
            disableRipple
            // LinkComponent={<Link href="/stock" />}
          >
            <SummarizeTwoToneIcon fontSize="inherit" />
          </IconButton>
          <IconButton sx={{ p: 0 }} aria-label="delete" size="large" disableRipple>
            <ShowChartTwoToneIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      <main css={main}>{props.children}</main>
    </div>
  );
}

export default Layout;

const activityBarWidth = '80px';

const container = css({
  display: 'flex',
});

const activityBar = css({
  width: activityBarWidth,
  height: '100vh',
  padding: 8,
  overflowY: 'auto',
});

const buttons = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '& :not(:last-child)': {
    marginBottom: '10px',
  },
});

const main = css({
  display: 'flex',
  flexGrow: 1,
  padding: 8,
  width: `calc(100% - ${activityBarWidth}px)`,
});
