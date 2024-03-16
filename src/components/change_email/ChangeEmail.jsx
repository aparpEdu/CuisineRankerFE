import React, {useState} from "react";
import api from "../../services/api";
import Spinner2 from "../spinner/Spinner2";


const ChangeEmail = () =>{
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateInputs();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            setIsLoading(true);
            setError("");
            setSuccess("");

            await api.post("/auth/change-email", {
                oldEmail: oldEmail,
                newEmail: newEmail
            });
            setIsLoading(false);
            setSuccess("Additional confirmation needed. Email was sent to " + oldEmail);
        } catch (e) {
            setIsLoading(false);
            if (e.response.data.message.length > 50) {
                setError("Internal Server Error");
            } else {
                setError(e.response.data.message);
            }
        }

    };

    const handleOldEmailChange = (e) => {
        setSuccess("");
        setOldEmail(e.target.value);
    };

    const handleNewEmailChange = (e) => {
        setSuccess("");
        setNewEmail(e.target.value);
    };

    const validateInputs = () => {

        const errors = {};
        if (!oldEmail.trim()) {
            errors.oldEmail = "Please enter your current email address.";
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(oldEmail)) {
            errors.oldEmail = "Please enter a valid email address.";
        }

        if (!newEmail.trim()) {
            errors.newEmail = "Please enter a new email address.";
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(newEmail)) {
            errors.newEmail = "Please enter a valid email address.";
        }

        if (newEmail === oldEmail) {
            errors.newEmail = "Please input a new email address";
        }

        setErrors(errors);
        return errors;
    };

    return(
      <div>
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label className={"settings-label"} htmlFor="oldEmail">Current Email:</label>
                  <input
                      className={"settings-input"}
                      type="email"
                      id="oldEmail"
                      onChange={handleOldEmailChange}
                  />
              </div>
              {errors.oldEmail && <span className="error">{errors.oldEmail}</span>}
              <div className="form-group">
                  <label className={"settings-label"} htmlFor="newEmail">New Email:</label>
                  <input
                      className={"settings-input"}
                      type="email"
                      id="newEmail"
                      onChange={handleNewEmailChange}
                  />
              </div>
              {errors.newEmail && <span className="error">{errors.newEmail}</span>}
              {error && <p className="error" >{error}</p>}
              {success && <p style={{ color: "yellow" }} className="success-email">{success}</p>}
              <button type="submit" className="button-save">SAVE CHANGES</button>
              {isLoading && (
                  <div className="spinner-overlay">
                      <Spinner2 />
                  </div>
              )}
          </form>
      </div>
    );
};

export default ChangeEmail;