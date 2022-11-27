import React from "react";
// import { Link } from "react-router-dom";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import OgpaModal from "../modals/ogpa";

const OgpaListTable = (props) => {
  const {
    ogpa,
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
      content: (ogpa) => ogpa.name,
    },
    {
      key: "email",
      path: "email",
      label: "Email",
      content: (ogpa) => ogpa.email,
    },
    {
      key: "password",
      path: "password",
      label: "Password",
      content: (ogpa) => ogpa.password,
    },
    {
      key: "mobile",
      path: "mobile",
      label: "Mobile",
      content: (ogpa) => ogpa.mobile,
    },
    {
      key: "amount",
      path: "amount",
      label: "Amount",
      content: (ogpa) => ogpa.amount,
    },
    {
      key: "payment",
      path: "payment",
      label: "Bank",
      content: (ogpa) => ogpa.payment,
    },
    {
      key: "dateStart",
      path: "dateStart",
      label: "Date Start",
      content: (ogpa) => ogpa.dateStart && ((new Date(ogpa.dateStart)).getFullYear() + "-" + String((new Date(ogpa.dateStart)).getMonth() + 1).padStart(2, '0') + "-" + String((new Date(ogpa.dateStart)).getDate()).padStart(2, '0')),
    },
    {
      key: "status",
      path: "status",
      label: "Status",
      content: (ogpa) => <span style={{ color: ogpa.status === "active" ? "green" : ogpa.status === "paid" ? "blue" : "red" }}>{ogpa.status}</span>
    },
    {
      key: "modal",
      content: (ogpa) => (
        <div>
          {modals.map((modal) => (
            <div key={modal.type} style={{ float: "right" }}>
              <OgpaModal
                type={modal.type}
                onSave={handlePageChange}
                onChange={handleInputChange}
                inputErrors={handleInputErrors}
                editInput={editInputValues}
                currentPage={currentPage}
                pageSize={pageSize}
                inputValues={
                  inputValues._id === ogpa._id ? inputValues : ogpa
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
      <TableBody columns={columns} data={ogpa} currentPage={currentPage} pageSize={pageSize} />
    </table>
  );
};

export default OgpaListTable;
