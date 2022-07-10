import React from "react";
import { Link } from "react-router-dom";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import Addiv2Modal from "../modals/addiv2";

const Addiv1Table = (props) => {
  const {
    addivList2,
    currentPage,
    handlePageChange,
    handleInputChange,
    handleInputErrors,
    editInputValues,
    couid,
    addiv1,
    coucode,
    couname,
    adDivName1,
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
      content: (addiv2) => (
        <Link
          to={
            "/addiv3/" +
            couid +
            "/" +
            addiv1 +
            "/" +
            addiv2._id +
            "?coucode=" +
            coucode +
            "&couname=" +
            couname +
            "&adDivName1=" +
            adDivName1 +
            "&adDivName2=" +
            addiv2.name
          }
        >
          {addiv2.name}
        </Link>
      ),
    },
    { key: "addiv2", label: "ID", content: (addiv2) => addiv2._id },
    { key: "addiv1", label: "Admin ID 1", content: () => addiv1 },
    { key: "couid", label: "Country ID", content: () => couid },
    {
      key: "modal",
      content: (addiv2) => (
        <div>
          {modals.map((modal) => (
            <div key={modal.type} style={{ float: "right" }}>
              <Addiv2Modal
                type={modal.type}
                onSave={handlePageChange}
                onChange={handleInputChange}
                inputErrors={handleInputErrors}
                editInput={editInputValues}
                inputValues={
                  inputValues._id === addiv2._id ? inputValues : addiv2
                }
                errors={errors}
                couid={couid}
                addiv1={addiv1}
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
        data={addivList2}
        currentPage={currentPage}
      />
    </table>
  );
};

export default Addiv1Table;
