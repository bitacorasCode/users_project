import { Button } from "react-bootstrap";
import DataTable from "../UI/DataTable";
import Pagination from "../UI/Pagination";
import DeleteAction from "../Actions/DeleteAction";

const columns = [
    {
        title: "Nombre completo",
        data: null,
        render: (_, type, row) => `${row.name} ${row.last_name}`,
    },
    {
        title: "Email",
        data: "email",
    },
    {
        title: "RUT/RUN",
        data: "rut",
    },
    {
        title: "Rol",
        data: "role.name",
    },
    {
        title: "Estado",
        data: "state.label",
    },
    {
        title: "Fecha creación",
        data: "created_at",
    },
    { title: "Acciones", name: "actions" },
];

export default function UserTable({ users, onPageChange, onViewDetail }) {
    const slots = {
        actions: (_, user) => (
            <div className="d-flex gap-2">
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onViewDetail?.(user)}
                >
                    Ver detalle
                </Button>

                <DeleteAction
                    resource={user}
                    getUrl={(user) => `/users/${user.id}`}
                    errorKey="deleteUser"
                    defaultErrorMessage="No se pudo eliminar el usuario."
                    message={`¿Estás seguro de que deseas eliminar a ${user.name} ${user.last_name}?`}
                />
            </div>
        ),
    };

    return (
        <>
            <DataTable data={users.data} columns={columns} slots={slots} />

            <Pagination
                currentPage={users.current_page}
                lastPage={users.last_page}
                from={users.from}
                to={users.to}
                total={users.total}
                onPageChange={onPageChange}
                label="usuarios"
            />
        </>
    );
}
