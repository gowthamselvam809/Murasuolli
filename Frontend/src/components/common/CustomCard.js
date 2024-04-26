import React from "react";
import Card from "react-bootstrap/Card";

const CustomCard = (porps) => {
  const { children } = porps;
  return (
    <Card className="custom-card">
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
}

export { CustomCard };