import React from "react";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import UpgradeModal from "../modals/upgrade";

const WithdrawTable = (props) => {
  const {
    upgrades,
    currentPage,
    pageSize,
    handlePageChange,
    handleInputChange,
    handleInputErrors,
    editInputValues,
    inputValues,
    errors,
    loadAllBillings,
    // onSort,
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
      content: (upgrades) => upgrades.name,
    },
    {
      path: "payment",
      label: "Bank",
      content: (upgrades) => upgrades.payment,
    },
    {
      path: "cycleType",
      label: "Subscription",
      content: (upgrades) => upgrades.cycleType,
    },
    {
      path: "totalPrice",
      label: "Amount",
      content: (upgrades) => upgrades.totalPrice,
    },
    {
      path: "domainName",
      label: "Domain Name",
      content: (upgrades) => upgrades.domainName,
    },
    {
      key: "payStatus",
      path: "payStatus",
      label: "Status",
      content: (upgrades) => <span style={{ color: upgrades.payStatus === "paid" ? "green" : "red" }}>{upgrades.payStatus}</span>
    },
    {
      key: "modal",
      content: (upgrades) => (
        <div>
          {modals.map((modal) => (
            <div key={modal.type} style={{ float: "right" }}>
              <UpgradeModal
                type={modal.type}
                onSave={handlePageChange}
                onChange={handleInputChange}
                inputErrors={handleInputErrors}
                editInput={editInputValues}
                currentPage={currentPage}
                pageSize={pageSize}
                inputValues={
                  inputValues._id === upgrades._id ? inputValues : upgrades
                }
                errors={errors}
                loadAllBillings={loadAllBillings}
              />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <table className="table">
      <TableHeader
        columns={columns}
        onSort={() => ""}
        // onSort={onSort}
      />
      <TableBody columns={columns} data={upgrades.slice(currentPage * pageSize - pageSize, currentPage * pageSize)} currentPage={currentPage} pageSize={pageSize} />
    </table>
  );
};

export default WithdrawTable;
