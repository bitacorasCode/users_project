import { Table } from "react-bootstrap";

import { useLazyInertiaProp } from "../../../Hooks";
import { AsyncContent } from "../../Helpers";

export default function UserNotesTab({ active, data }) {
    const { loading, loaded, error } = useLazyInertiaProp({
        prop: "notes",
        active,
    });

    return (
        <AsyncContent
            loading={loading}
            loaded={loaded}
            error={error}
            data={data}
            loadingMessage="Cargando notas..."
            emptyMessage="Este usuario no tiene notas registradas."
        >
            <div className="pt-4">
                <Table responsive hover className="mb-0">
                    <thead>
                        <tr>
                            <th>Nota / Observación</th>
                            <th>Fecha de creación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((note) => (
                            <tr key={note.id}>
                                <td> {note.note} </td>
                                <td>
                                    {note.created_at
                                        ? new Date(
                                              note.created_at,
                                          ).toLocaleDateString()
                                        : "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </AsyncContent>
    );
}
