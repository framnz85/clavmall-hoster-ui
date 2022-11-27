import Input from "./inputText";
import Select from "./inputSelect";

const ModalCommon = ({
  exampleModal,
  type,
  modalHide,
  onSubmit,
  onChange,
  inputProperty,
}) => {
  return (
    <div>
      <div
        className="modal fade"
        ref={exampleModal}
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {type ? type.charAt(0).toUpperCase() + type.slice(1) : "Add"}{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={modalHide}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={onSubmit}>
              {type !== "delete" && (
                <div className="modal-body">
                  {inputProperty.map((prop) =>
                    prop.type && prop.type.name === "select" ? (
                      <Select
                        key={prop.name}
                        onChange={onChange}
                        name={prop.name}
                        label={prop.label}
                        options={prop.type.options}
                        style={{ color: "#333333" }}
                        error={prop.error}
                        value={prop.value}
                      />
                    ) : prop.type && prop.type.name === "date" ? (
                      <Input
                        key={prop.name}
                        onChange={onChange}
                        name={prop.name}
                        type={prop.type.name}
                        label={prop.label}
                        style={{ color: "#333333" }}
                        error={prop.error}
                        value={prop.value}
                      />
                    ) : (
                      <Input
                        key={prop.name}
                        onChange={onChange}
                        name={prop.name}
                        label={prop.label}
                        style={{ color: "#333333" }}
                        error={prop.error}
                        value={prop.value}
                      />
                    )
                  )}
                </div>
              )}
              {type === "delete" && (
                <div align="center" className="modal-body">
                  <h4>{inputProperty[0].value}</h4>
                  {inputProperty[0].error && (
                    <div className="alert alert-danger">
                      {inputProperty[0].error}
                    </div>
                  )}
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={modalHide}
                >
                  Close
                </button>
                <button
                  className={
                    type === "delete" ? "btn btn-danger" : "btn btn-primary"
                  }
                >
                  {type === "delete" ? "Delete" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCommon;
