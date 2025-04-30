import React from "react";
import { Modal, Button, Image } from "react-bootstrap";

export default function RoleModalBootstrap({ show, onHide, roles, onSelect }) {
  return (
    <Modal show={show} onHide={onHide} centered animation={true}>
      <Modal.Header closeButton />

      <Modal.Body className="d-flex flex-wrap justify-content-center">
        {roles.map(({ name, iconPath }) => (
          <Button
            key={name}
            variant="link"
            onClick={() => {
              onSelect(name);
              onHide();
            }}
            className="m-3 p-0 rm-role-btn"
          >
            <Image src={iconPath} rounded width={80} height={80} />
          </Button>
        ))}
      </Modal.Body>
    </Modal>
  );
}
