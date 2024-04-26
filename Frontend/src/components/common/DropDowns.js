import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DropDowns = ({ props }) => {
  console.log({ Naanu: props });
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Actions
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">View</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export { DropDowns };