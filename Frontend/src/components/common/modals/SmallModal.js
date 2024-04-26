import React from "react";
import Modal from "react-bootstrap/Modal";

const SmallModal = (props) => {

  const { title, showModal, setShowModal } = props;

  return (
    <Modal size="sm" show={showModal} onHide={() => setShowModal(false)} aria-labelledby="example-modal-sizes-title-sm">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>...</Modal.Body>
    </Modal>
  );
}

export { SmallModal };