import { Form } from "react-bootstrap";
export default function SelectField({
    label,
    value,
    onChange,
    onBlur,
    options = [],
    placeholder = "Seleccionar...",
    error,
}) {
    return (
        <Form.Group className="mb-3">
            <Form.Label> {label} </Form.Label>
            <Form.Select
                value={value}
                isInvalid={!!error}
                onChange={(event) => onChange(event.target.value)}
                onBlur={onBlur}
            >
                <option value=""> {placeholder} </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
}
