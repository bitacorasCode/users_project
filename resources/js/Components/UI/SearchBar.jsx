import { Form, InputGroup } from "react-bootstrap";

export default function SearchBar({
    value,
    onChange,
    placeholder = "Buscar...",
}) {
    return (
        <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>

            <Form.Control
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                aria-label={placeholder}
            />
        </InputGroup>
    );
}
