import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import Joi from "joi-browser";
import ModalCommon from "../common/modal";
import httpPayment from "../../services/httpPayment";
import paymentCategories from "../common/payCategories";

const PaymentModal = ({
  type,
  onSave,
  onChange,
  inputErrors,
  editInput,
  addInput,
  inputValues,
  errors,
}) => {
  const [modal, setModal] = useState(null);
  const exampleModal = useRef();

  useEffect(() => {
    setModal(new Modal(exampleModal.current));
  }, []);

  const schema = {
    name: Joi.string().min(2).max(255).required(),
    category: Joi.string().min(2).max(255).required(),
  };

  const validate = () => {
    const { name, category } = inputValues;
    const result = Joi.validate({ name, category }, schema, {
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

    try {
      if (type === "add") {
        await httpPayment.postPayment(inputValues);
      } else if (type === "edit") {
        await httpPayment.putPayment(inputValues);
      } else if (type === "delete") {
        await httpPayment.deletePayment(inputValues);
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
      label: "Name",
      error: errors.name,
      value: inputValues.name,
    },
    {
      name: "category",
      label: "Category",
      type: {
        name: "select",
        options: paymentCategories,
      },
      error: errors.category,
      value: inputValues.category,
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

export default PaymentModal;
