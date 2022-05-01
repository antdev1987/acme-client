import React, { useState } from "react";
import { useAppProvider } from "../../context/appContext/AppProvider";


const initialInputs = {
  userName: "",
  name: "",
  password: "",
};

const AddUserForm = () => {
  const { createNewUserAppfn } = useAppProvider();
  const [inputs, setInputs] = useState(initialInputs);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewUserAppfn(inputs);

    console.log("el submit");
    setInputs({
      userName: "",
      name: "",
      password: "",
    });
  };

  const handleShow = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="border border-3 rounded p-2">
      <button onClick={handleShow} className="btn btn-primary">
        Crear Usuario
      </button>

      {showForm && (
        <form className="w-50 m-auto mt-1 border p-3 bg-light shadow" onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Crear un nuevo Usuario</h3>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              placeholder="user Name"
              value={inputs.userName}
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
            />
            <span className="input-group-text">Y</span>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="name"
              value={inputs.name}
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="password"
              name="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddUserForm;
