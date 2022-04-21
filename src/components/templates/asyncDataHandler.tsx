import React from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./asyncDataHandler.module.scss";

export interface AsyncDataHandlerProps<T> {
  data: T | undefined;
  error: unknown | undefined;
  children: (settledData: T) => React.ReactElement;
  skeletonProps?: SkeletonProps;
}
export const AsyncDataHandler = <T,>({
  data,
  error,
  children,
  skeletonProps,
}: AsyncDataHandlerProps<T>): React.ReactElement => {
  if (error !== undefined) {
    const description = tryStringify(error) ?? "不明なエラーです";

    return (
      <div>
        <h3 className={styles.error_heading}>エラーが発生しました</h3>
        <p>{description}</p>
      </div>
    );
  }

  return data !== undefined ? children(data) : <Skeleton {...skeletonProps} />;
};

const tryStringify = (value: unknown): string | undefined => {
  if (value == null) {
    return undefined;
  }

  if (typeof value !== "object") {
    return String(value);
  }

  if (value instanceof Error) {
    return value.message;
  }

  if (Object.keys(value).includes("toString")) {
    return value.toString();
  }

  return undefined;
};
