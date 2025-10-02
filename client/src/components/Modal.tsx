import React, { ReactNode } from "react";
import "../components_css/Modal.css";

interface ModalProps {
  children: ReactNode;
  onSubmit: (message: string) => void;
  onCancel: (message: string) => void;
  onClose: (message: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ onSubmit, onCancel, onClose, children }) => {
  return (
      <div
          className="modal-container"
          onClick={(e) => {
            if ((e.target as HTMLElement).className === "modal-container") {
              onClose("The modal was closed");
            }
          }}
      >
        <div className="modal">
          <div className="modal-header">
            <p className="close" onClick={() => onClose("Modal was closed")}>&times;</p>
          </div>
          <div className="modal-content">{children}</div>

          <div className="modal-footer">
            <button className="btn-submit" onClick={() => onSubmit("The submit button was clicked")}>
              Add
            </button>
            <button className="btn-cancel" onClick={() => onClose("")}>
              Cancel
            </button>
          </div>
        </div>
      </div>
  );
};