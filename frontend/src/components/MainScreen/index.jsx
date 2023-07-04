import React, { useEffect, useReducer, useState } from "react";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EditModal from "../EditModal";
import { useCallback } from "react";
import * as actions from "./actions";
import * as apiCalls from "./../../apiCalls";
import reducer, { initSate } from "./reducer";

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function loadData(dispatch) {
    apiCalls.loadData().then((data) => dispatch({ type: actions.actionDataLoad, data }));
}
export default function () {
    const [state, dispatch] = useReducer(reducer, initSate);
    const [editableItem, setEditableItem] = useState(null);
    const [error, setError] = useState("");
    useEffect(() => {
        loadData(dispatch);
    }, []);
    const handleRemoveItem = useCallback((e) => {
        e.preventDefault();
        const { internalid } = e.currentTarget.dataset;
        dispatch({ type: actions.actionDelete, data: { internalid } });
    }, []);
    const handleEditItem = useCallback(
        (e) => {
            e.preventDefault();
            const { internalid } = e.currentTarget.dataset;
            const itemForEdit = state.list.find((x) => x._id == internalid);
            setEditableItem({ ...itemForEdit });
        },
        [state.list]
    );
    const handleCancelEditItem = useCallback((e) => {
        setEditableItem(null);
    }, []);
    const handleEndEditItem = useCallback((data) => {
        dispatch({ type: actions.actionEndEdit, data: data });
        setEditableItem(null);
    }, []);

    const handleAddItem = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: actions.actionAdd, data: {} });
    }, []);

    const handleSaveChanges = useCallback(
        (e) => {
            e.preventDefault();
            const data = state.list.filter(
                (x) => (x.isChnaged && !x.isRemoved) || (x.id && x.isRemoved)
            );
            apiCalls
                .saveBatch(data)
                .then(() => loadData(dispatch))
                .catch(() => {
                    setError("Data wasn't saved. Could you please check inputs.");
                });
        },
        [state.list]
    );

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Button onClick={handleAddItem} className="mr-2">
                        Add
                    </Button> { " "}
                    <Button
                        onClick={handleSaveChanges}
                        disabled={!state.list.find((x) => x.isChnaged)}>
                        Save
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Street Name</th>
                                <th>House Number</th>

                                <th>Apartment Number</th>

                                <th>Postal Code</th>

                                <th>Town</th>

                                <th>Phone Number</th>

                                <th>Date of Birth</th>

                                <th>Age </th>
                                <th>Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.list
                                .filter((x) => !x.isRemoved)
                                .map((x) => {
                                    return (
                                        <tr
                                            key={x._id}
                                            className={x.isChnaged ? "table-warning" : ""}>
                                            <td>{x.firstName}</td>
                                            <td>{x.lastName}</td>
                                            <td>{x.streetName}</td>
                                            <td>{x.houseNumber}</td>
                                            <td>{x.apartmentNumber}</td>
                                            <td>{x.postalCode}</td>

                                            <td>{x.town}</td>

                                            <td>{x.phoneNumber}</td>
                                            <td>{x.dateOfBirth.toLocaleDateString()}</td>
                                            <td>{getAge(x.dateOfBirth)} </td>
                                            <td>
                                                <Button
                                                    size="sm"
                                                    onClick={handleEditItem}
                                                    data-internalid={x._id}>
                                                    Edit
                                                </Button>{" "}
                                                <Button
                                                    size="sm"
                                                    onClick={handleRemoveItem}
                                                    data-internalid={x._id}>
                                                    Remove
                                                </Button>{" "}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={handleAddItem} className="mr-2">
                        Add
                    </Button>{" "}
                    <Button
                        onClick={handleSaveChanges}
                        disabled={!state.list.find((x) => x.isChnaged)}>
                        Save
                    </Button>
                </Col>
            </Row>

            {editableItem && (
                <EditModal
                    handleCancelEditItem={handleCancelEditItem}
                    handleEndEditItem={handleEndEditItem}
                    value={editableItem}
                />
            )}
            <Modal show={!!error} onHide={() => setError("")}>
                <Modal.Header closeButton>
                    <Modal.Title>Problem with saving data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>{error}</Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setError("")}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
