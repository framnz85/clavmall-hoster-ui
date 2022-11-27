import React from "react";
import { Link } from "react-router-dom";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import EstoreModal from "../modals/estore";

const EstoreTable = (props) => {
  const {
    estores,
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
      label: "eStore",
      content: (estore) => <Link to={`/estore/${estore._id}`}>{estore.name}</Link>,
    },
    { key: "estid", path: "_id", label: "ID", content: (estore) => estore._id },
    { key: "urlname1", path: "urlname1", label: "URL Name", content: (estore) => <a href={`https://${estore.urlname1}.clavstore.com`} target="_blank" rel="noreferrer">{estore.urlname1}</a> },
    { key: "status", path: "status", label: "Status", content: (estore) => <span style={{color: estore.status === "active" ? "green" : "red"}}>{estore.status}</span> },
    {
      key: "modal",
      content: (estore) => (
        <div>
          {modals.map((modal) => (
            <div key={modal.type} style={{ float: "right" }}>
              <EstoreModal
                type={modal.type}
                onSave={handlePageChange}
                onChange={handleInputChange}
                inputErrors={handleInputErrors}
                editInput={editInputValues}
                inputValues={
                  inputValues._id === estore._id ? inputValues : estore
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
      <TableBody columns={columns} data={estores} currentPage={currentPage} />
    </table>
  );
};

export default EstoreTable;
