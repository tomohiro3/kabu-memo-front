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

// memo
// コンポネントそれ自体にposition: fixedを持たせるのは良くない気もするが
// メニューバーは表示箇所が左右か（上）下と限定的なため自身でpositionを管理することにする？
const container = css`
  background-color: #eee;
  height: 100%;
  padding: 8px 0;
  position: fixed;

  @media (max-width: ${BREAK_POINT.medium}px) {
    width: 100%;
    bottom: 0;
    height: 50px;
    padding: 0 8px;
    z-index: 2;
  }

  & > ul {
    display: flex;
    justify-content: center;
    flex-direction: column;
    list-style-type: none;
    margin-block-start: unset;
    padding-inline-start: unset;

    &:not(:last-child): {
      margin-bottom: 10px;
    }

    & > li {
      text-align: center;
    }

    @media (max-width: ${BREAK_POINT.medium}px) {
      align-items: base;
      height: 100%;
      flex-direction: row;
      justify-content: space-between;

      & :not(:last-child): {
        margin-right: 8px;
      }
    }
  }
`;
