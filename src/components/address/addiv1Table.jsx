import React from "react";
import { Link } from "react-router-dom";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import Addiv1Modal from "../modals/addiv1";

const Addiv1Table = (props) => {
  const {
    addivList1,
    currentPage,
    handlePageChange,
    handleInputChange,
    handleInputErrors,
    editInputValues,
    couid,
    coucode,
    couname,
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
      label: "Admin Division 1",
      content: (addiv1) => (
        <Link
          to={
            "/addiv2/" +
            couid +
            "/" +
            addiv1._id +
            "?coucode=" +
            coucode +
            "&couname=" +
            couname +
            "&adDivName1=" +
            addiv1.name
          }
        >
          {addiv1.name}
        </Link>
      ),
    },
    { key: "addiv1", label: "ID", content: (addiv1) => addiv1._id },
    { key: "couid", label: "Country ID", content: () => couid },
    {
      key: "modal",
      content: (addiv1) => (
        <div>
          {modals.map((modal) => (
            <div key={modal.type} style={{ float: "right" }}>
              <Addiv1Modal
                type={modal.type}
                onSave={handlePageChange}
                onChange={handleInputChange}
                inputErrors={handleInputErrors}
                editInput={editInputValues}
                inputValues={
                  inputValues._id === addiv1._id ? inputValues : addiv1
                }
                errors={errors}
                couid={couid}
                coucode={coucode}
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
      <TableBody
        columns={columns}
        data={addivList1}
        currentPage={currentPage}
      />
    </table>
  );
};

export default Addiv1Table;
