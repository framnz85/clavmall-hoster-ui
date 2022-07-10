import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import Joi from "joi-browser";
import ModalCommon from "../common/modal";
import httpCountry from "../../services/httpCountry";

const CountriesModal = ({
  type,
  onSave,
  onChange,
  inputErrors,
  editInput,
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
    countryCode: Joi.string().min(2).max(3).required(),
    currency: Joi.string().min(3).max(3).required(),
  };

  const validate = () => {
    const { name, countryCode, currency } = inputValues;
    const result = Joi.validate({ name, countryCode, currency }, schema, {
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
        await httpCountry.postCountries(inputValues);
      } else if (type === "edit") {
        await httpCountry.putCountries(inputValues);
      } else if (type === "delete") {
        await httpCountry.deleteCountries(inputValues);
      }

      modal.hide();
      onSave(1);
    } catch (e) {
      if (e.response) {
        errors.name = e.response.data;
        errors.countryCode = e.response.data;
        errors.currency = e.response.data;
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
      label: "Country Name",
      error: errors.name,
      value: inputValues.name,
    },
    {
      name: "countryCode",
      label: "Country Code (2 Small Letters)",
      error: errors.countryCode,
      value: inputValues.countryCode,
    },
    {
      name: "currency",
      label: "Currency (3 Capital Letters)",
      error: errors.currency,
      value: inputValues.currency,
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

export default CountriesModal;
