import { Card, Col, Form, Row } from "react-bootstrap";

import SelectField from "../../UI/SelectField";

const fields = [
    { name: "name", label: "Nombre", type: "text", maxLength: 100 },
    { name: "last_name", label: "Apellido", type: "text", maxLength: 100 },
    { name: "email", label: "Email", type: "email" },
    { name: "rut", label: "RUT/RUN", type: "text" },
    { name: "phone", label: "Teléfono", type: "number" },
];

export default function PersonalDataSection({ form, roles, states }) {
    return (
        <Card className="mb-4">
            <Card.Header>
                <strong>Datos personales</strong>
            </Card.Header>
            <Card.Body>
                <Row>
                    {fields.map((field) => (
                        <Col md={6} key={field.name}>
                            <Form.Group className="mb-3">
                                <Form.Label>{field.label}</Form.Label>
                                <Form.Control
                                    type={field.type}
                                    value={form.data[field.name]}
                                    maxLength={field.maxLength}
                                    isInvalid={form.invalid(field.name)}
                                    onChange={(event) =>
                                        form.setData(
                                            field.name,
                                            event.target.value,
                                        )
                                    }
                                    onBlur={() => form.validate(field.name)}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {form.errors[field.name]}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    ))}
                    <Col md={6}>
                        <SelectField
                            label="Rol"
                            value={form.data.role_id}
                            options={roles}
                            placeholder="Seleccionar rol"
                            error={form.errors.role_id}
                            onChange={(value) => form.setData("role_id", value)}
                            onBlur={() => form.validate("role_id")}
                        />
                    </Col>
                    <Col md={6}>
                        <SelectField
                            label="Estado"
                            value={form.data.state}
                            options={states}
                            placeholder="Seleccionar estado"
                            error={form.errors.state}
                            onChange={(value) => form.setData("state", value)}
                            onBlur={() => form.validate("state")}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
