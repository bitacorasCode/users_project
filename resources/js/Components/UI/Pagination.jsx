import { Pagination as BootstrapPagination } from "react-bootstrap";

export default function Pagination({
    currentPage,
    lastPage,
    from,
    to,
    total,
    onPageChange,
    itemLabel = "elementos",
}) {
    if (lastPage <= 1) {
        return null;
    }

    const pages = [];

    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));

    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > lastPage) {
        endPage = lastPage;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
    }

    return (
        <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">
                Mostrando {from}–{to} de {total} {itemLabel}
            </div>

            <BootstrapPagination className="mb-0">
                <BootstrapPagination.First
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(1)}
                />

                <BootstrapPagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                />

                {startPage > 1 && (
                    <>
                        <BootstrapPagination.Item
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </BootstrapPagination.Item>

                        {startPage > 2 && (
                            <BootstrapPagination.Ellipsis disabled />
                        )}
                    </>
                )}

                {pages.map((page) => (
                    <BootstrapPagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </BootstrapPagination.Item>
                ))}

                {endPage < lastPage && (
                    <>
                        {endPage < lastPage - 1 && (
                            <BootstrapPagination.Ellipsis disabled />
                        )}

                        <BootstrapPagination.Item
                            onClick={() => onPageChange(lastPage)}
                        >
                            {lastPage}
                        </BootstrapPagination.Item>
                    </>
                )}

                <BootstrapPagination.Next
                    disabled={currentPage === lastPage}
                    onClick={() => onPageChange(currentPage + 1)}
                />

                <BootstrapPagination.Last
                    disabled={currentPage === lastPage}
                    onClick={() => onPageChange(lastPage)}
                />
            </BootstrapPagination>
        </div>
    );
}
