import React, { useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  background-color: #ddd;
  color: black;
  //width: 80%;

  margin: 20px auto;
  font-family: Arial, sans-serif;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }

  .selected {
    background-color: #edf092;
  }

  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    margin: 0 5px;
    color: black;

  }

  .add-student {
    display: block;
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
  }

  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  .popup input {
    display: block;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
  }

  .popup button {
    margin-top: 10px;
  }
`;

const initialData = [
  { id: 1, name: "Amit Sharma", gender: "Male", dob: "1990-03-15" },
  { id: 2, name: "Priya Verma", gender: "Female", dob: "1992-07-22" },
  { id: 3, name: "Rajesh Kumar", gender: "Male", dob: "1988-11-11" },
  { id: 4, name: "Sunita Joshi", gender: "Female", dob: "1995-05-30" },
  { id: 5, name: "Vikas Patel", gender: "Male", dob: "1991-08-19" },
  { id: 6, name: "Anjali Gupta", gender: "Female", dob: "1993-10-05" },
  { id: 7, name: "Manish Tiwari", gender: "Male", dob: "1987-09-12" },
  { id: 8, name: "Kiran Rao", gender: "Female", dob: "1996-04-25" },
  { id: 9, name: "Sandeep Yadav", gender: "Male", dob: "1989-06-18" },
  { id: 10, name: "Meera Iyer", gender: "Female", dob: "1994-12-29" },
];

const TableComponent = () => {
  const [state, setState] = useState({
    data: initialData,
    newRow: { name: "", gender: "", dob: "" },
    editingId: null,
    selectedId: null,
    showPopup: false,
  });

  const handleChange = (e) => {
    setState({
      ...state,
      newRow: { ...state.newRow, [e.target.name]: e.target.value },
    });
  };

  const handleAdd = () => {
    if (!state.newRow.name || !state.newRow.gender || !state.newRow.dob) return;
    setState({
      ...state,
      data: [...state.data, { id: state.data.length + 1, ...state.newRow }],
      newRow: { name: "", gender: "", dob: "" },
      showPopup: false,
    });
  };

  const handleEdit = (id) => {
    setState({ ...state, editingId: id });
  };

  const handleSave = () => {
    setState({ ...state, editingId: null });
  };

  const handleDelete = () => {
    if (state.selectedId !== null) {
      setState({
        ...state,
        data: state.data.filter((row) => row.id !== state.selectedId),
        selectedId: null,
      });
    }
  };

  return (
    <Styles>
      <span
        className='add-student'
        onClick={() => setState({ ...state, showPopup: true })}>
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M12 5v14M5 12h14' />
        </svg>
        Add Student
      </span>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.data.map((row, index) => (
            <tr
              key={row.id}
              className={state.selectedId === row.id ? "selected" : ""}
              onClick={() => setState({ ...state, selectedId: row.id })}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.gender}</td>
              <td>{row.dob}</td>
              <td>
                {state.selectedId === row.id && (
                  <>
                    <button
                      className='icon-button'
                      onClick={() => handleEdit(row.id)}>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path d='M12 20h9' />
                        <path d='M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z' />
                      </svg>
                    </button>
                    <button className='icon-button' onClick={handleDelete}>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path d='M3 6h18' />
                        <path d='M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
                        <path d='M10 11v6' />
                        <path d='M14 11v6' />
                      </svg>
                    </button>
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
