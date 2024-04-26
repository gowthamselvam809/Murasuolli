import React from "react";
import { Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const UpdateProfileSceleton = () => {

  return (
    <Row>
      <Col md={6}>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
      </Col>
      <Col md={6}>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
      </Col>
      <Row>
        <Skeleton height={50} />
      </Row>
    </Row>
  )
}

export { UpdateProfileSceleton }