import React from "react";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import WithdrawModal from "../modals/withdraw";

const WithdrawTable = (props) => {
  const {
    withdrawals,
    currentPage,
    pageSize,
    handlePageChange,
    handleInputChange,
    handleInputErrors,
    editInputValues,
    inputValues,
    errors,
    onSort,
  } = props;

  const modals = [{ type: "edit" }];

  const columns = [
    {
      key: "number",
      label: "#",
      index: true,
    },
    {
      path: "name",
      label: "Name",
      content: (withdrawals) => withdrawals.name,
    },
    {
      path: "product",
      label: "Product",
      content: (withdrawals) => withdrawals.product,
    },
    {
      path: "amount",
      label: "Amount",
      content: (withdrawals) => withdrawals.amount,
    },
    {
      path: "commission",
      label: "Commission",
      content: (withdrawals) => withdrawals.commission,
    },
    {
      key: "status",
      path: "status",
      label: "Status",
      content: (withdrawals) => <span style={{ color: withdrawals.status === "Approved" ? "green" : "red" }}>{withdrawals.status}</span>
    },
    {
      key: "modal",
      content: (withdrawals) => (
        <div>
          {modals.map((modal) => (
            <div key={modal.type} style={{ float: "right" }}>
              <WithdrawModal
                type={modal.type}
                onSave={handlePageChange}
                onChange={handleInputChange}
                inputErrors={handleInputErrors}
                editInput={editInputValues}
                currentPage={currentPage}
                pageSize={pageSize}
                inputValues={
                  inputValues._id === withdrawals._id ? inputValues : withdrawals
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
      <TableBody columns={columns} data={withdrawals} currentPage={currentPage} pageSize={pageSize} />
    </table>
  );
};

export default WithdrawTable;
