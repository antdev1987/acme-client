import React from "react";

const ListUsers = ({ userBd }) => {
  console.log(userBd);

  return (
    <div className="mt-3 w-75 m-auto">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">UserName</th>
            <th scope="col">Name</th>
            <th scope="col">password</th>
            <th scope="col">role</th>
          </tr>
        </thead>
        <tbody>
          {userBd.map((item, idx) => (
            <tr key={item._id}>
              <th scope="row">{idx + 1}</th>
              <td>{item.userName}</td>
              <td>{item.name}</td>
              <td>{item.password}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;
