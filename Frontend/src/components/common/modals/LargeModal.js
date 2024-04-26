import React from "react";
import Modal from "react-bootstrap/Modal";

const LargeModal = (props) => {

  const { title, showModal, setShowModal, children } = props;

  return (
    <Modal size="lg" show={showModal} onHide={() => setShowModal(false)} aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export { LargeModal };