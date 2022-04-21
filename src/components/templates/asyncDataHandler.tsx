import React from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface AsyncDataHandlerProps<T> {
  data: T | undefined;
  error: any;
  children: (settledData: T) => React.ReactElement;
  skeletonProps?: SkeletonProps;
}
export const AsyncDataHandler = <T,>({
  data,
  error,
  children,
  skeletonProps,
}: AsyncDataHandlerProps<T>): React.ReactElement => {
  return data !== undefined ? children(data) : <Skeleton {...skeletonProps} />;
};
