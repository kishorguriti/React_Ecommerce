import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmModel(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => props.onClose(true);
  const handleDismiss = () => props.onClose(false); //  depending on the user click we are passing the true/false values

  return (
    <>
      <Modal show={show} onHide={handleDismiss} className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure you want to delete the User</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDismiss}>
            No
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModel;
