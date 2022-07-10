import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import Joi from "joi-browser";
import ModalCommon from "../common/modal";
import httpAddiv1 from "../../services/httpAddiv1";

const Addiv1Modal = ({
  type,
  onSave,
  onChange,
  inputErrors,
  editInput,
  inputValues,
  errors,
  couid,
  coucode,
}) => {
  const [modal, setModal] = useState(null);
  const exampleModal = useRef();

  useEffect(() => {
    setModal(new Modal(exampleModal.current));
  }, []);

  const schema = {
    name: Joi.string().min(2).max(255).required(),
  };

  const validate = () => {
    const { name } = inputValues;
    const result = Joi.validate({ name }, schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details)
      if (!errors[item.path[0]]) errors[item.path[0]] = item.message;

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      inputErrors(err);
      return;
    }

    const { name } = inputValues;

    try {
      if (type === "add") {
        await httpAddiv1.postAddiv1({ name }, couid, coucode);
      } else if (type === "edit") {
        await httpAddiv1.putAddiv1(inputValues, couid, coucode);
      } else if (type === "delete") {
        await httpAddiv1.deleteAddiv1(inputValues, couid, coucode);
      }

      modal.hide();
      onSave(1);
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
      label: "Admin Division 1 Name",
      error: errors.name,
      value: inputValues.name,
    },
  ];

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
        onClick={() => (type === "add" ? modal.show() : startEdit())}
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

export default Addiv1Modal;
