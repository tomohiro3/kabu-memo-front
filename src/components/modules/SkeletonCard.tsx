import { css } from '@emotion/react';
import styles from '../../styles/skeleton.module.scss';

export default function SkeletonCard() {
  return (
    <div
      css={css`
        border-radius: 4px;
        border: 1px solid #eee;
        height: 180px;
        width: 260px;
        padding: 16px;
      `}
    >
      <div
        className={styles.skeleton}
        css={css`
          margin-bottom: 16px;
          height: 27px;
        `}
      ></div>
      <div
        css={css`
          & > div:not(:last-of-type) {
            margin-bottom: 16px;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            & > div {
              height: 20px;
              &:first-of-type {
                margin-right: 8px;
              }
            }
          `}
        >
          <div
            className={styles.skeleton}
            css={css`
              flex-basis: 30%;
            `}
          ></div>
          <div
            className={styles.skeleton}
            css={css`
              flex-basis: 70%;
            `}
          ></div>
        </div>
        <div
          css={css`
            display: flex;
            & > div {
              height: 20px;
              &:first-of-type {
                margin-right: 8px;
              }
            }
          `}
        >
          <div
            className={styles.skeleton}
            css={css`
              flex-basis: 30%;
            `}
          ></div>
          <div
            className={styles.skeleton}
            css={css`
              flex-basis: 70%;
            `}
          ></div>
        </div>
        <div
          css={css`
            display: flex;
            & > div {
              height: 20px;
              &:first-of-type {
                margin-right: 8px;
              }
            }
          `}
        >
          <div
            className={styles.skeleton}
            css={css`
              flex-basis: 30%;
            `}
          ></div>
          <div
            className={styles.skeleton}
            css={css`
              flex-basis: 70%;
            `}
          ></div>
        </div>
      </div>
    </div>
  );
}
