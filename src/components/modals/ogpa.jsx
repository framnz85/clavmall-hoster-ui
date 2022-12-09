import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import ModalCommon from "../common/modal";
import httpOgpa from "../../services/httpOgpa";
import ogpaOptions from "../common/ogpaOptions";

const OgpaModal = ({
  type,
  onSave,
  onChange,
  inputErrors,
  editInput,
  currentPage,
  addInput,
  inputValues,
  errors,
}) => {
  const [modal, setModal] = useState(null);
  const exampleModal = useRef();

  useEffect(() => {
    setModal(new Modal(exampleModal.current));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (type === "edit") {
        await httpOgpa.putOgpa(inputValues);
      } else if (type === "delete") {
        await httpOgpa.deleteOgpa(inputValues);
      }

      modal.hide();
      onSave(currentPage);
    } catch (e) {
      if (e.response) {
        errors.name = e.response.data;
        inputErrors(errors);
      }
    }
  };

  const startEdit = () => {
    inputValues.searchQuery = "";
    editInput(inputValues);
    modal.show();
  };

  const inputProperty = [
    {
      name: "name",
      label: "Name",
      value: inputValues.name,
    },
    {
      name: "email",
      label: "Email",
      value: inputValues.email,
    },
    {
      name: "password",
      label: "Password",
      value: inputValues.password,
    },
    {
      name: "dateStart",
      label: "Date Start",
      type: {
        name: "date",
      },
      value: (new Date(inputValues.dateStart)).getFullYear() + "-" + String((new Date(inputValues.dateStart)).getMonth() + 1).padStart(2, '0') + "-" + String((new Date(inputValues.dateStart)).getDate()).padStart(2, '0'),
    },
    {
      name: "status",
      label: "Status",
      type: {
        name: "select",
        options: ogpaOptions.statusOptions,
      },
      value: inputValues.status,
    },
  ];

  const startAdd = () => {
    addInput();
    modal.show();
  };

  return (
    <div>
      <button
        type="button"
        className={
          type === "add"
            ? "btn btn-outline-success"
            : type === "edit"
            ? "btn btn-outline-secondary col-3 btn-sm"
            : "btn btn-outline-danger col-3 btn-sm"
        }
        onClick={() => (type === "add" ? startAdd() : startEdit())}
        style={
          type === "add"
            ? {}
            : {
                width: "60px",
                marginRight: "5px",
              }
        }
      >
        {type === "add" ? "+ Add" : type === "edit" ? "Edit" : "Delete"}
      </button>

      <ModalCommon
        exampleModal={exampleModal}
        type={type}
        modalHide={() => modal.hide()}
        onSubmit={handleSubmit}
        onChange={onChange}
        inputProperty={inputProperty}
      />
    </div>
  );
};

export default OgpaModal;
