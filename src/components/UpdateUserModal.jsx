import React, { useState } from "react";
import "./update-modal.css";

const UpdateUserModal = ({ user, onClose, onUpdate }) => {
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.user_metadata?.formatedPhone || "");
  const [fullName, setFullName] = useState(
    user?.user_metadata?.full_name || ""
  );
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate({ email, fullName, phone });
    }
  };
  return (
    <>
      <div className="update-user-modal-master-container">
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Update Personal Information</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="full_name_form">
                Full Name:
                <input
                  type="text"
                  name="full_name_form"
                  value={fullName}
                  // We comment out the line below, so that the user can change the email
                  onChange={(e) => setFullName(e.target.value)}
                  // onChange={(e) => {
                  //   return e;
                  // }}
                  // disabled
                />
              </label>
              <label htmlFor="phone_form">
                Phone Number:
                <input
                  type="text"
                  name="phone_form"
                  value={phone}
                  // placeholder="+1 (000) 123-4567"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label htmlFor="email_form">
                Email (Unchangeble):
                <input
                  type="email"
                  name="email_form"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled
                />
              </label>
              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUserModal;
