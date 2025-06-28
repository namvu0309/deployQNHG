import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginateUi = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="d-flex justify-content-center my-3">
            <Pagination>
                <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink previous onClick={() => onPageChange(currentPage - 1)} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, idx) => (
                    <PaginationItem key={idx + 1} active={currentPage === idx + 1}>
                        <PaginationLink onClick={() => onPageChange(idx + 1)}>
                            {idx + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink next onClick={() => onPageChange(currentPage + 1)} />
                </PaginationItem>
            </Pagination>
        </div>
    );
};

export default PaginateUi; 