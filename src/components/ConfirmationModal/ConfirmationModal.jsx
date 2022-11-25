import React from "react";

const ConfirmationModal = ({
  modalTitle,
  confirmAction,
  message,
  buttonText,
  closeModal,
  modalData,
}) => {
  return (
    <div>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-80">
          <h3 className="font-bold text-lg">{modalTitle}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              htmlFor="confirmation-modal"
              onClick={closeModal}
              className="btn btn-outline"
            >
              Cancel
            </label>
            <label
              onClick={() => confirmAction(modalData)}
              htmlFor="confirmation-modal"
              className="btn btn-warning"
            >
              {buttonText}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
