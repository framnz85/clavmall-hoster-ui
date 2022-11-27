import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import Joi from "joi-browser";

import ModalCommon from "../common/modal";
import httpEstore from "../../services/httpEstore";
import estoreOptions from "../common/estoreOptions";

const EstoreModal = ({
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

  useEffect(() => {
    const duration = estoreOptions.durationOptions.filter(dur => dur.desc === inputValues.duration);
    const numDays = duration[0] && duration[0].value;
    if (parseInt(numDays) > 0) {
      const date = new Date(inputValues.endDate);
      date.setDate(date.getDate() + parseInt(numDays));
      inputValues.endDate = date;
    }
  }, [inputValues, inputValues.duration]);

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

    try {
      if (type === "add") {
        await httpEstore.postEstores(inputValues);
      } else if (type === "edit") {
        await httpEstore.putEstores(inputValues);
      } else if (type === "delete") {
        await httpEstore.deleteEstores(inputValues);
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
      label: "eStore Name",
      error: errors.name,
      value: inputValues.name,
    },
    {
      name: "urlname1",
      label: "URL Name",
      error: errors.urlname1,
      value: inputValues.urlname1,
    },
    {
      name: "duration",
      label: "Add Duration",
      type: {
        name: "select",
        options: estoreOptions.durationOptions,
      },
      value: inputValues.duration,
    },
    {
      name: "endDate",
      label: "End Date",
      type: {
        name: "date",
      },
      value: (new Date(inputValues.endDate)).getFullYear() + "-" + String((new Date(inputValues.endDate)).getMonth() + 1).padStart(2, '0') + "-" + String((new Date(inputValues.endDate)).getDate()).padStart(2, '0'),
    },
    {
      name: "planType",
      label: "Plan Type",
      type: {
        name: "select",
        options: estoreOptions.planOptions,
      },
      value: inputValues.planType,
    },
    {
      name: "recurringCycle",
      label: "Recurring Cycle",
      type: {
        name: "select",
        options: estoreOptions.recurringCycle,
      },
      value: inputValues.recurringCycle,
    },
    {
      name: "status",
      label: "Status",
      type: {
        name: "select",
        options: estoreOptions.statusOptions,
      },
      value: inputValues.status,
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

export default EstoreModal;
