import React, {useEffect, useState} from "react";
import api from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./GeneralSettings.css"

const GeneralSettings = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [initialFirstName, setInitialFirstName] = useState("");
    const [initialLastName, setInitialLastName] = useState("");
    const [errors, setErrors] = useState({});
    const [isDisabled, setDisabled] = useState(true)

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
            setErrors([])
            toast.success("Saved changes");
        } catch (e) {
           toast.error(e.response.data.message);
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
      <div >
          <form onSubmit={handleSubmit}>
              <div className={"general-settings-container"}>
                  <label  htmlFor="firstName">First Name:</label>
                  <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={handleInputChange}
                  />
              {errors.firstName && <span >{errors.firstName}</span>}
                  <label  htmlFor="lastName">Last Name:</label>
                  <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={handleInputChange}
                  />

              {errors.lastName && <span>{errors.lastName}</span>}
              <button type="submit" disabled={isDisabled} className="button-save">SAVE CHANGES</button>
              </div>
          </form>
          <ToastContainer />
      </div>
    );
};

export default GeneralSettings;