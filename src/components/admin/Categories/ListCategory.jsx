import React from "react";
import {
  Card,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ROWS_PER_PAGE = 10;
const fullUrl = `http://localhost:8000/storage/`;

const ListCategory = ({ paginate = {}, data = [], onDelete, onPageChange, onEdit }) => {
  const currentPage = paginate.page || 1;
  const perPage = paginate.perPage || ROWS_PER_PAGE;
  const totalPages = paginate.totalPage || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <Table bordered responsive hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: 60 }}>#</th>
                <th>Ảnh</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Danh mục cha</th>
                <th>Trạng thái</th>
                <th style={{ width: 120 }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                data.map((category, idx) => (
                  <tr key={category.id}>
                    <td>{(currentPage - 1) * perPage + idx + 1}</td>
                    <td>
                      {category.image_url ? (
                        <img
                          src={`${fullUrl}${category.image_url}`}
                          alt={category.name}
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                        />
                      ) : (
                        <span>Không có ảnh</span>
                      )}
                    </td>
                    <td>{category.name}</td>
                    <td>{category.description || "N/A"}</td>
                    <td>{category.parent?.name || "Không có"}</td>
                    <td>
                      {category.is_active ? (
                        <span className="badge bg-success">Hoạt động</span>
                      ) : (
                        <span className="badge bg-danger">Không hoạt động</span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/category/edit/${category.id}`}
                        className="btn btn-primary btn-sm me-2"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onEdit) onEdit(category.id);
                        }}
                      >
                        <MdModeEdit />
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          if (onDelete) onDelete(category.id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </CardBody>
        {totalPages > 1 && (
          <CardBody className="d-flex justify-content-end">
            <Pagination aria-label="pagination">
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink first onClick={() => handlePageChange(1)} />
              </PaginationItem>
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  previous
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem active={currentPage === i + 1} key={i}>
                  <PaginationLink onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                  next
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                  last
                  onClick={() => handlePageChange(totalPages)}
                />
              </PaginationItem>
            </Pagination>
          </CardBody>
        )}
      </Card>
    </>
  );
};

export default ListCategory;