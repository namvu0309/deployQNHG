import React, { useMemo, useState } from "react";
import TableContainer from "@components/admin/ui/TableContainer";
import { Card, CardBody } from "reactstrap";
import DeleteModal from "@components/admin/ui/DeleteModal";

const ListBranch = ({ data = [], onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Định nghĩa cấu trúc cột cho TableContainer
  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        header: "Tên chi nhánh",
        accessorKey: "name",
        enableSorting: true,
        enableColumnFilter: false,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        header: "Địa chỉ",
        accessorKey: "address",
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        header: "Hành động",
        accessorKey: "actions",
        enableColumnFilter: false,
        cell: ({ row }) => (
          <>
            <button className="btn btn-primary btn-sm me-2">Sửa</button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                setSelectedId(row.original.id);
                setShowDelete(true);
              }}
            >
              Xóa
            </button>
          </>
        ),
        enableSorting: false,
      },
    ],
    []
  );

  const handleDelete = () => {
    if (onDelete && selectedId !== null) {
      onDelete(selectedId);
    }
    setShowDelete(false);
    setSelectedId(null);
  };

  return (
    <>
      <Card>
        <CardBody>
          <TableContainer
            columns={columns}
            data={data}
            isGlobalFilter={true}
            isPagination={true}
            SearchPlaceholder="Tìm kiếm..."
            pagination="pagination"
            paginationWrapper="dataTables_paginate paging_simple_numbers"
            tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
          />
        </CardBody>
      </Card>
      <DeleteModal
        show={showDelete}
        onDeleteClick={handleDelete}
        onCloseClick={() => setShowDelete(false)}
      />
    </>
  );
};

export default ListBranch;
