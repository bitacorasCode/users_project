import { Form } from "react-bootstrap";

export default function SearchBar({
    value,
    onChange,
    placeholder = "Buscar...",
}) {
    return (
        <Form.Control
            type="search"
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
        />
    );
}
