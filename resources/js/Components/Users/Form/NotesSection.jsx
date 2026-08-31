import { Button, Card, Form } from "react-bootstrap";

export default function NotesSection({ form }) {
    const handleChange = (index, value) => {
        const notes = [...form.data.notes];

        notes[index] = {
            ...notes[index],
            note: value,
        };

        form.setData("notes", notes);

        const fieldName = `notes.${index}.note`;

        if (form.valid(fieldName) || form.invalid(fieldName)) {
            form.validate(fieldName);
        }
    };

    const handleBlur = (index) => {
        form.validate(`notes.${index}.note`);
    };

    const handleAddNote = () => {
        form.setData("notes", [
            ...form.data.notes,
            {
                note: "",
            },
        ]);
    };

    const handleRemoveNote = (index) => {
        if (form.data.notes.length <= 1) {
            return;
        }

        const notes = form.data.notes.filter(
            (_, noteIndex) => noteIndex !== index,
        );

        form.setData("notes", notes);
    };

    return (
        <Card className="mb-4">
            <Card.Header>
                <strong>Notas</strong>
            </Card.Header>

            <Card.Body>
                {form.data.notes.map((note, index) => {
                    const fieldName = `notes.${index}.note`;

                    return (
                        <div key={index} className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className="mb-0">
                                    Nota / Observación {index + 1}
                                </Form.Label>

                                {form.data.notes.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleRemoveNote(index)}
                                    >
                                        Eliminar
                                    </Button>
                                )}
                            </div>

                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={note.note}
                                isInvalid={form.invalid(fieldName)}
                                onChange={(event) =>
                                    handleChange(index, event.target.value)
                                }
                                onBlur={() => handleBlur(index)}
                            />

                            <Form.Control.Feedback type="invalid">
                                {form.errors[fieldName]}
                            </Form.Control.Feedback>
                        </div>
                    );
                })}

                <Button
                    type="button"
                    variant="outline-primary"
                    onClick={handleAddNote}
                >
                    + Agregar nota
                </Button>
            </Card.Body>
        </Card>
    );
}
