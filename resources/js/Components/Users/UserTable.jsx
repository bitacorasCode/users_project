import { Link } from "@inertiajs/react";

import { formatDate } from "../../Helpers";
import { DeleteAction } from "../Common";
import { DataTable, Pagination } from "../UI";

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
        render: (_, type, row) => formatDate(row.created_at),
    },
    {
        title: "Acciones",
        name: "actions",
        width: "160px",
    },
];

export default function UserTable({ users, onPageChange }) {
    const slots = {
        actions: (_, user) => (
            <div className="d-flex gap-2">
                <Link
                    className="btn btn-sm btn-outline-primary"
                    href={`/users/${user.id}`}
                >
                    Detalle
                </Link>

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
        <div className="table-layout-sticky">
            <div className="table-scroll-sticky table-fix-row-size">
                <DataTable data={users.data} columns={columns} slots={slots} />
            </div>

            <div className="table-pagination-sticky">
                <Pagination
                    currentPage={users.current_page}
                    lastPage={users.last_page}
                    from={users.from}
                    to={users.to}
                    total={users.total}
                    onPageChange={onPageChange}
                    itemLabel="usuarios"
                />
            </div>
        </div>
    );
}
