import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ReactTableSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="#f2f2f2"
      highlightColor="#96c7ff"
      // borderRadius="1rem"
      duration={4}
    >
      <table className="table">
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
          </tr>
          <tr>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
          </tr>
          <tr>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
          </tr>
          <tr>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
          </tr>
          <tr>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
          </tr>
          <tr>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
          </tr>
          <tr>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
          </tr>
          <tr>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
            <td>{<Skeleton height={50} />}</td>
          </tr>
        </tbody>
      </table>
    </SkeletonTheme>
  )
}

export { ReactTableSkeleton }