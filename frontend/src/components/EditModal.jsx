import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";

export default function (props) {
    const { handleEndEditItem, handleCancelEditItem, value } = props;
    const [editableItem, setEditableItem] = useState(value);

    useEffect(() => {
        setEditableItem(value);
    }, [value]);
    const handleInputChanges = useCallback((e) => {
        e.preventDefault();
        const { name, type } = e.currentTarget;
        let value = e.currentTarget.value;

        if (type == "date") {
            if (!value) {
                return;
            }
            value = new Date(value);
        }
        setEditableItem((x) => {
            return { ...x, [name]: value };
        });
    }, []);
    const endEditing = useCallback(() => {
        if (handleEndEditItem) {
            handleEndEditItem(editableItem);
        }
    }, [handleEndEditItem, editableItem]);
    const handleResetChanges = useCallback(() => {
        setEditableItem(value);
    }, [value]);
    return (
        <Modal show={!!editableItem} onHide={handleCancelEditItem}>
            <Modal.Header closeButton>
                <Modal.Title>Modal for editing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={4}>First Name *</Col>
                    <Col sm={8}>
                        <input
                            name="firstName"
                            value={editableItem.firstName}
                            onChange={handleInputChanges}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>Last Name *</Col>
                    <Col sm={8}>
                        {" "}
                        <input
                            name="lastName"
                            value={editableItem.lastName}
                            onChange={handleInputChanges}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>Street Name *</Col>
                    <Col sm={8}>
                        {" "}
                        <input
                            name="streetName"
                            value={editableItem.streetName}
                            onChange={handleInputChanges}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>House Number *</Col>
                    <Col sm={8}>
                        {" "}
                        <input
                            name="houseNumber"
                            value={editableItem.houseNumber}
                            onChange={handleInputChanges}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>Apartment Number</Col>
                    <Col sm={8}>
                        {" "}
                        <input
                            name="apartmentNumber"
                            value={editableItem.apartmentNumber}
                            onChange={handleInputChanges}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>Postal Code *</Col>
                    <Col sm={8}>
                        <input
                            name="postalCode"
                            value={editableItem.postalCode}
                            onChange={handleInputChanges}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>Town *</Col>
                    <Col sm={8}>
                        {" "}
                        <input
                            name="town"
                            value={editableItem.town}
                            onChange={handleInputChanges}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>Phone Number *</Col>
                    <Col sm={8}>
                        <input
                            name="phoneNumber"
                            value={editableItem.phoneNumber}
                            onChange={handleInputChanges}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>Date of Birth *</Col>
                    <Col sm={8}>
                        {" "}
                        <input
                            name="dateOfBirth"
                            type="date"
                            value={editableItem.dateOfBirth.toISOString().split('T')[0]}
                            onChange={handleInputChanges}
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleResetChanges}>
                    Reset Changes
                </Button>
                <Button variant="success" onClick={endEditing}>
                    End Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
