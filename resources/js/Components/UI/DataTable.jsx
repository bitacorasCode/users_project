import DataTableLibrary from "datatables.net-react";
import DT from "datatables.net-bs5";

DataTableLibrary.use(DT);

export default function DataTable({ data = [], columns = [], options = {} }) {
    const defaultOptions = {
        paging: false,
        searching: false,
        info: false,
        ordering: false,
    };

    return (
        <DataTableLibrary
            data={data}
            columns={columns}
            className="table table-striped table-hover"
            options={{
                ...defaultOptions,
                ...options,
            }}
        />
    );
}
