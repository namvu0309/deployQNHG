import React from "react";
import { Row, Col } from "reactstrap";
import CardContact from "./card-branch";

const GridBranch = ({ data = [] }) => {
  return (
    <Row>
      {data.map((branch) => (
        <Col md="3" sm="6" xs="12" key={branch.id} className="mb-4">
          <CardContact branch={branch} />
        </Col>
      ))}
    </Row>
  );
};

export default GridBranch;
