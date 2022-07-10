import React from "react";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import Addiv3Modal from "../modals/addiv3";

const Addiv1Table = (props) => {
  const {
    addivList3,
    currentPage,
    handlePageChange,
    handleInputChange,
    handleInputErrors,
    editInputValues,
    couid,
    addiv1,
    addiv2,
    coucode,
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
    },
    { key: "addiv3", label: "ID", content: (addiv3) => addiv3._id },
    { key: "addiv2", label: "Admin ID 2", content: () => addiv2 },
    { key: "addiv1", label: "Admin ID 1", content: () => addiv1 },
    { key: "couid", label: "Country ID", content: () => couid },
    {
      key: "modal",
      content: (addiv3) => (
        <div>
          {modals.map((modal) => (
            <div key={modal.type} style={{ float: "right" }}>
              <Addiv3Modal
                type={modal.type}
                onSave={handlePageChange}
                onChange={handleInputChange}
                inputErrors={handleInputErrors}
                editInput={editInputValues}
                inputValues={
                  inputValues._id === addiv3._id ? inputValues : addiv3
                }
                errors={errors}
                couid={couid}
                addiv1={addiv1}
                addiv2={addiv2}
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
        data={addivList3}
        currentPage={currentPage}
      />
    </table>
  );
};

export default Addiv1Table;
