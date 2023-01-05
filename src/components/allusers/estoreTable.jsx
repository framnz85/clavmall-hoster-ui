import React from "react";
import { Link } from "react-router-dom";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import EstoreModal from "../modals/estore";
import { notification } from 'antd';

const EstoreTable = (props) => {
  const [api, contextHolder] = notification.useNotification();
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
      content: (estore) =>
        <>
          <Link to={`/estore/${estore._id}`}>{estore.name}</Link>{" "}
          <span style={{ cursor: "pointer" }} onClick={() => copyUrlname(estore.name)}>📄</span>
        </>,
    },
    {
      key: "estid",
      path: "_id",
      label: "ID",
      content: (estore) => 
        <>
           {estore._id} <span style={{cursor: "pointer"}} onClick={() => copyUrlname(estore._id)}>📄</span>
        </>
    },
    {
      key: "urlname1",
      path: "urlname1",
      label: "URL Name",
      content: (estore) =>
        <>
          <a
            href={`https://${estore.urlname1}.clavstore.com`}
            target="_blank"
            rel="noreferrer"
            id={`urlname${estore._id}`}
          >
            {estore.urlname1}
          </a>{" "}
          <span style={{cursor: "pointer"}} onClick={() => copyUrlname(estore.urlname1)}>📄</span>
        </>
    },
    {
      path: "owner",
      label: "Owner",
      content: (estore) => estore.owner,
    },
    {
      key: "endDate",
      path: "endDate",
      label: "End Date",
      content: (estore) => estore.endDate && ((new Date(estore.endDate)).getFullYear() + "-" + String((new Date(estore.endDate)).getMonth() + 1).padStart(2, '0') + "-" + String((new Date(estore.endDate)).getDate()).padStart(2, '0')),
    },
    {
      key: "status",
      path: "status",
      label: "Status",
      content: (estore) => <span style={{ color: estore.status === "active" ? "green" : "red" }}>{estore.status}</span>
    },
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

  const copyUrlname = (urlname) => {
    navigator.clipboard.writeText(urlname);
    openNotification('top', urlname);
  }

  const openNotification = (placement, urlname) => {
    api.info({
      message: `Copied ${urlname}`,
      placement,
    });
  };
  
  return (
    <>
      {contextHolder}
      <table className="table">
        <TableHeader columns={columns} onSort={onSort} />
        <TableBody columns={columns} data={estores} currentPage={currentPage} />
      </table>
    </>
  );
};

export default EstoreTable;
