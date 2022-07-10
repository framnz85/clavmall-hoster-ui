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
      content: (estore) => <Link to={"/"}>{estore.name}</Link>,
    },
    { key: "estid", label: "ID", content: (estore) => estore._id },
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