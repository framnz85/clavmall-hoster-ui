import React from "react";
// import { Link } from "react-router-dom";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import PaymentModal from "../modals/payments";

const PaymentTable = (props) => {
  const {
    payments,
    currentPage,
    handlePageChange,
    handleInputChange,
    handleInputErrors,
    editInputValues,
    inputValues,
    errors,
    onSort,
  } = props;

  const modals = [{ type: "delete" }, { type: "edit" }];

  const columns = [
    {
      key: "number",
      label: "#",
      index: true,
    },
    {
      path: "name",
      label: "Name",
      content: (payment) => payment.name,
    },
    {
      key: "category",
      path: "category",
      label: "Category",
      content: (payment) => payment.category,
    },
    {
      key: "modal",
      content: (payment) => (
        <div>
          {modals.map((modal) => (
            <div key={modal.type} style={{ float: "right" }}>
              <PaymentModal
                type={modal.type}
                onSave={handlePageChange}
                onChange={handleInputChange}
                inputErrors={handleInputErrors}
                editInput={editInputValues}
                inputValues={
                  inputValues._id === payment._id ? inputValues : payment
                }
                errors={errors}
              />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} />
      <TableBody columns={columns} data={payments} currentPage={currentPage} />
    </table>
  );
};

export default PaymentTable;
