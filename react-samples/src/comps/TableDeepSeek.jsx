import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const Styles = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }



  tr.selected {
    background-color: #edf092;
    color: black;
  }

  button {
    margin: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  input {
    padding: 5px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
  }

  .form-container {
    margin: 20px 0;
  }
`;

const TableComponent = () => {
  // Sample initial data with Indian names and dd-mm-yyyy date format
  const initialData = [
    { id: 1, name: "Aarav Patel", gender: "Male", dob: "15-08-1990" },
    { id: 2, name: "Ananya Sharma", gender: "Female", dob: "22-07-1992" },
    { id: 3, name: "Vihaan Gupta", gender: "Male", dob: "10-05-1985" },
    { id: 4, name: "Isha Reddy", gender: "Female", dob: "03-12-1988" },
    { id: 5, name: "Arjun Singh", gender: "Male", dob: "25-09-1995" },
    { id: 6, name: "Saanvi Kumar", gender: "Female", dob: "30-01-1991" },
    { id: 7, name: "Reyansh Joshi", gender: "Male", dob: "12-06-1987" },
    { id: 8, name: "Aditi Desai", gender: "Female", dob: "18-03-1993" },
    { id: 9, name: "Krishna Mishra", gender: "Male", dob: "22-04-1989" },
    { id: 10, name: "Anika Choudhury", gender: "Female", dob: "05-11-1994" },
  ];

  const [data, setData] = useState(initialData);
  const [formData, setFormData] = useState({ id: null, name: "", gender: "", dob: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing row
      const updatedData = data.map((item) =>
        item.id === formData.id ? formData : item
      );
      setData(updatedData);
    } else {
      // Add new row
      const newData = { ...formData, id: data.length + 1 };
      setData([...data, newData]);
    }
    setFormData({ id: null, name: "", gender: "", dob: "" });
    setIsEditing(false);
    setSelectedRowId(null); // Deselect row after submission
  };

  // Edit row
  const handleEdit = (row) => {
    setFormData(row);
    setIsEditing(true);
    setSelectedRowId(row.id);
  };

  // Delete row
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setSelectedRowId(null); // Deselect row after deletion
  };

  // Select row
  const handleRowSelect = (id) => {
    setSelectedRowId(id === selectedRowId ? null : id); // Toggle selection
  };

  return (
    <Styles>
      <div className="form-container">
        <h3>{isEditing ? "Edit Row" : "Add Row"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="dob"
            placeholder="DOB (dd-mm-yyyy)"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{isEditing ? "Update" : "Add"}</button>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className={row.id === selectedRowId ? "selected" : ""}
              onClick={() => handleRowSelect(row.id)}
            >
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.gender}</td>
              <td>{row.dob}</td>
              <td>
                {row.id === selectedRowId && (
                  <>
                    <button onClick={() => handleEdit(row)}>Edit</button>
                    <button onClick={() => handleDelete(row.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Styles>
  );
};

export default TableComponent;