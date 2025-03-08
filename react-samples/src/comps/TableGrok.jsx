import React, { useState } from 'react';
import styled from 'styled-components';

// Single styled component with all styles
const Styled = styled.div`
color: black;
  &.table-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
  }

  &.table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  &.th {
    background-color: #4CAF50;
    color: white;
    padding: 12px;
    text-align: left;
  }

  &.td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
  }

  &.selected {
    background-color: #edf092;
  }

  &.form-container {
    margin-bottom: 20px;
  }

  &.input {
    color: white;
    padding: 8px;
    margin: 0 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  &.button {
    padding: 8px 16px;
    margin: 0 5px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      opacity: 0.9;
    }
  }

  &.delete-button {
    background-color: #f44336;
  }
`;

const TableComponent = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Rahul Sharma', gender: 'Male', dob: '15-05-1990' },
    { id: 2, name: 'Priya Patel', gender: 'Female', dob: '22-08-1992' },
    { id: 3, name: 'Amit Kumar', gender: 'Male', dob: '01-12-1988' },
    { id: 4, name: 'Neha Singh', gender: 'Female', dob: '10-03-1995' },
    { id: 5, name: 'Vikram Reddy', gender: 'Male', dob: '18-07-1991' },
    { id: 6, name: 'Anjali Gupta', gender: 'Female', dob: '25-09-1993' },
    { id: 7, name: 'Suresh Iyer', gender: 'Male', dob: '30-11-1989' },
    { id: 8, name: 'Pooja Desai', gender: 'Female', dob: '14-02-1994' },
    { id: 9, name: 'Rakesh Joshi', gender: 'Male', dob: '08-06-1990' },
    { id: 10, name: 'Kavita Nair', gender: 'Female', dob: '20-04-1992' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: ''
  });
  const [editId, setEditId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Format date from yyyy-mm-dd to dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  // Parse date from dd-mm-yyyy to yyyy-mm-dd for input
  const parseDate = (date) => {
    if (!date) return '';
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const value = e.target.name === 'dob' ? formatDate(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (editId) {
      setData(data.map(item => 
        item.id === editId ? { ...item, ...formData } : item
      ));
      setEditId(null);
    } else {
      const newRecord = {
        id: data.length + 1,
        ...formData
      };
      setData([...data, newRecord]);
    }
    setFormData({ name: '', gender: '', dob: '' });
    setSelectedRow(null);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      name: item.name,
      gender: item.gender,
      dob: item.dob
    });
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    setSelectedRow(null);
  };

  const handleRowClick = (id) => {
    setSelectedRow(id === selectedRow ? null : id);
  };

  return (
    <Styled className="table-container">
      <Styled className="form-container">
        <form onSubmit={handleCreate}>
          <Styled
            as="input"
            className="input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <Styled
            as="input"
            className="input"
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            required
          />
          <Styled
            as="input"
            className="input"
            type="date"
            name="dob"
            value={parseDate(formData.dob)}
            onChange={handleChange}
            required
          />
          <Styled
            as="button"
            className="button"
            type="submit"
          >
            {editId ? 'Update' : 'Add'}
          </Styled>
        </form>
      </Styled>

      <Styled as="table" className="table">
        <thead>
          <tr>
            <Styled as="th" className="th">S.No.</Styled>
            <Styled as="th" className="th">Name</Styled>
            <Styled as="th" className="th">Gender</Styled>
            <Styled as="th" className="th">DOB</Styled>
            <Styled as="th" className="th">Actions</Styled>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => handleRowClick(item.id)}
              className={selectedRow === item.id ? 'selected' : ''}
            >
              <Styled as="td" className="td">{item.id}</Styled>
              <Styled as="td" className="td">{item.name}</Styled>
              <Styled as="td" className="td">{item.gender}</Styled>
              <Styled as="td" className="td">{item.dob}</Styled>
              <Styled as="td" className="td">
                {selectedRow === item.id && (
                  <>
                    <Styled
                      as="button"
                      className="button"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Styled>
                    <Styled
                      as="button"
                      className="button delete-button"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Styled>
                  </>
                )}
              </Styled>
            </tr>
          ))}
        </tbody>
      </Styled>
    </Styled>
  );
};

export default TableComponent;