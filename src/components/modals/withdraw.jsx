import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import ModalCommon from "../common/modal";
import httpWithdraw from "../../services/httpWithdraw";
import withdrawOptions from "../common/withdrawOptions";

const WithdrawModal = ({
  type,
  onSave,
  onChange,
  inputErrors,
  editInput,
  currentPage,
  pageSize,
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
        await httpWithdraw.putWithdraw(inputValues);
      }

      modal.hide();
      onSave(currentPage, pageSize);
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
      name: "status",
      label: "Status",
      type: {
        name: "select",
        options: withdrawOptions.statusOptions,
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

export default WithdrawModal;
