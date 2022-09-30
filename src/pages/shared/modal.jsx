import React from "react";
import { Modal, Button, Container } from 'react-bootstrap'

export default function ModalFormClients({ show, handleClose, title, children }) {

      return <>
            <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        <Container>
                              {children}
                        </Container>
                  </Modal.Body>
                  <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                              Fechar
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                              Salvar
                        </Button>
                  </Modal.Footer>
            </Modal>
      </>
}


