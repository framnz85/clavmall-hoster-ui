import React from "react";
import { Link } from "react-router-dom";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import CountriesModal from "../modals/countries";

const CountriesTable = (props) => {
  const {
    countries,
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
      label: "Country",
      content: (country) => (
        <Link
          to={
            "/addiv1/" +
            country._id +
            "?coucode=" +
            country.countryCode +
            "&couname=" +
            country.name
          }
        >
          {country.name}
        </Link>
      ),
    },
    { path: "countryCode", label: "ISO Code" },
    { path: "currency", label: "ISO Code" },
    { key: "couid", label: "ID", content: (country) => country._id },
    {
      key: "modal",
      content: (country) => (
        <div>
          {modals.map((modal) => (
            <div key={modal.type} style={{ float: "right" }}>
              <CountriesModal
                type={modal.type}
                onSave={handlePageChange}
                onChange={handleInputChange}
                inputErrors={handleInputErrors}
                editInput={editInputValues}
                inputValues={
                  inputValues._id === country._id ? inputValues : country
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
      <TableBody columns={columns} data={countries} currentPage={currentPage} />
    </table>
  );
};

export default CountriesTable;
