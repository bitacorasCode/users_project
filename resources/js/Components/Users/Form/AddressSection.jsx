import { Card, Col, Form, Row } from "react-bootstrap";

const fields = [
    { name: "street", label: "Calle", type: "text", col: 6 },
    { name: "city", label: "Ciudad", type: "text", col: 4 },
    { name: "zip_code", label: "Código postal", type: "text", col: 2 },
];

export default function AddressSection({ form }) {
    const handleChange = (field, value) => {
        const fieldName = `address.${field}`;

        form.setData("address", { ...form.data.address, [field]: value });

        if (form.valid(fieldName) || form.invalid(fieldName)) {
            form.validate(fieldName);
        }
    };

    const handleBlur = (field) => {
        form.validate(`address.${field}`);
    };

    return (
        <Card className="mb-4">
            <Card.Header>
                <strong>Dirección</strong>
            </Card.Header>
            <Card.Body>
                <Row>
                    {fields.map((field) => {
                        const fieldName = `address.${field.name}`;
                        return (
                            <Col md={field.col} key={field.name}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{field.label}</Form.Label>
                                    <Form.Control
                                        type={field.type}
                                        value={form.data.address[field.name]}
                                        isInvalid={form.invalid(fieldName)}
                                        onChange={(event) =>
                                            handleChange(
                                                field.name,
                                                event.target.value,
                                            )
                                        }
                                        onBlur={() => handleBlur(field.name)}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {form.errors[fieldName]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        );
                    })}
                </Row>
            </Card.Body>
        </Card>
    );
}
