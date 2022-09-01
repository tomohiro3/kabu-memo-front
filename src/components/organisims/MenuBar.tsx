import { css } from '@emotion/react';
import HomeIcon from '@mui/icons-material/Home';
import ShowChartTwoToneIcon from '@mui/icons-material/ShowChartTwoTone';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { BREAK_POINT } from '../../constants/style';

export default function MenuBar({ className }: { className?: string }) {
  return (
    <div className={className} css={container}>
      <ul aria-label="Page switcher">
        <li>
          <Link href="/">
            <IconButton aria-label="Home" disableRipple>
              <HomeIcon fontSize="large" sx={{ p: 0 }} />
            </IconButton>
          </Link>
        </li>
        <li>
          <Link href="/stock">
            <IconButton aria-label="Stock Page" disableRipple>
              <SummarizeTwoToneIcon fontSize="large" sx={{ p: 0 }} />
            </IconButton>
          </Link>
        </li>
        <li>
          <IconButton aria-label="Chart Page" size="large" disableRipple>
            <ShowChartTwoToneIcon fontSize="large" sx={{ p: 0 }} />
          </IconButton>
        </li>
      </ul>
    </div>
  );
}

const container = css`
  background-color: #eee;
  height: 100%;
  padding: 8px 0;
  width: 100%;

  & > ul {
    display: flex;
    justify-content: center;
    flex-direction: column;

    & > li {
      text-align: center;

      &:not(:last-of-type) {
        margin-bottom: 10px;
      }
    }
  }

  @media (max-width: ${BREAK_POINT.medium}px) {
    padding: 0 8px;

    & > ul {
      align-items: base;
      flex-direction: row;
      justify-content: space-between;

      & > li:not(:last-of-type) {
        margin-bottom: unset;
        margin-right: 8px;
      }
    }
  }
`;
