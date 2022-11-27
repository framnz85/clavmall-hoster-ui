import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import ModalCommon from "../common/modal";
import httpUpgrade from "../../services/httpUpgrade";
import upgradeOptions from "../common/upgradeOptions";

const UpgradeModal = ({
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
  loadAllBillings,
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
        await httpUpgrade.putEstoreBillings(inputValues);
      }

      modal.hide();
      onSave(currentPage, pageSize);
      loadAllBillings();
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
      name: "payStatus",
      label: "Status",
      type: {
        name: "select",
        options: upgradeOptions.statusOptions,
      },
      value: inputValues.payStatus,
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

export default UpgradeModal;
