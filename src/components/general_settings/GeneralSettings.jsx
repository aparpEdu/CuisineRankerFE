import React, {useEffect, useState} from "react";
import api from "../../services/api";

const GeneralSettings = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [initialFirstName, setInitialFirstName] = useState("");
    const [initialLastName, setInitialLastName] = useState("");
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const [isDisabled, setDisabled] = useState(true)
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/users');
                const data = response.data;
                const name = data.name.split(" ");
                setFirstName(name.at(0))
                setLastName(name.at(1))
                setInitialFirstName(name[0]);
                setInitialLastName(name[1]);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData()
    }, []);

    const handleInputChange = (e) => {
        setSuccess("");
        const { id, value } = e.target;
        if (
            (id === "firstName" && value !== initialFirstName)  ||
            (id === "lastName" && value !== initialLastName)
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

        if (id === "firstName") {
            setFirstName(value);
            delete errors.firstName;
        } else if (id === "lastName") {
            setLastName(value);
            delete errors.lastName;
        }

        if (value.trim() === "" || (id === "firstName" && lastName.trim() === "") || (id === "lastName" && firstName.trim() === "")) {
            setDisabled(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateInput();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setDisabled(true);
            return;
        }
        try {
            const response = await api.patch("/users", {
                firstName: firstName,
                lastName: lastName
            });
            setInitialFirstName(response.data.firstName);
            setInitialLastName(response.data.lastName);
            setDisabled(true);
            setSuccess("Saved changes");
            setErrors([])
        } catch (e) {
            setError(e.response.data.message);
        }
    };

    const validateInput = () => {

        if (!firstName.trim()) {
            errors.firstName = "Please enter a first name.";
            setDisabled(true);
        } else if (!/^[A-Za-z'-. ]{1,50}$/.test(firstName)) {
            errors.firstName = "Please enter a valid first name.";
            setDisabled(true);
        } else {
            delete errors.firstName;
            setErrors(errors);
        }

        if (!lastName.trim()) {
            errors.lastName = "Please enter a last name.";
            setDisabled(true);
        } else if (!/^[A-Za-z'-. ]{1,50}$/.test(lastName)) {
            errors.lastName = "Please enter a valid last name.";
            setDisabled(true);
        }
        return errors;
    };

    return (
      <div>
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label className={"settings-label"} htmlFor="firstName">First Name:</label>
                  <input
                      className={"settings-input"}
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={handleInputChange}
                  />

              </div>
              {errors.firstName && <span className="error">{errors.firstName}</span>}
              <div className="form-group">
                  <label className={"settings-label"}  htmlFor="lastName">Last Name:</label>
                  <input
                      className={"settings-input"}
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={handleInputChange}
                  />
              </div>
              {errors.lastName && <span className="error">{errors.lastName}</span>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "lime" }} className="error-success">{success}</p>}
              <button type="submit" disabled={isDisabled} className="button-save">SAVE CHANGES</button>

          </form>
      </div>
    );
};

export default GeneralSettings;