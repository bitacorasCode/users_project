import { Form } from "react-bootstrap";

export default function SelectField({
    label,
    value,
    onChange,
    options = [],
    placeholder = "Seleccionar...",
}) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>

            <Form.Select
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                <option value="">{placeholder}</option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}
