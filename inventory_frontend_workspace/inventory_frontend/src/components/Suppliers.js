import React, { useState } from "react";
import "../App.css";

// PUBLIC_INTERFACE
function Suppliers() {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "ABC", contact: "abc@email.com" },
    { id: 2, name: "PaperCo", contact: "paperco@email.com" }
  ]);
  const [modal, setModal] = useState({ open: false, mode: null, item: null });
  const [form, setForm] = useState({ name: "", contact: "" });

  const openModal = (mode, item = null) => {
    setModal({ open: true, mode, item });
    setForm(item ? { ...item } : { name: "", contact: "" });
  };
  const closeModal = () => setModal({ open: false, mode: null, item: null });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modal.mode === "Add") {
      setSuppliers((sups) => [
        ...sups,
        { id: Date.now(), ...form }
      ]);
    } else if (modal.mode === "Edit" && modal.item) {
      setSuppliers((sups) =>
        sups.map((it) => (it.id === modal.item.id ? { ...modal.item, ...form } : it))
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setSuppliers((its) => its.filter((it) => it.id !== id));
  };

  return (
    <div className="suppliers-page">
      <div className="crud-title-row">
        <h2>Suppliers</h2>
        <button className="btn" onClick={() => openModal("Add")}>Add Supplier</button>
      </div>
      <div className="crud-table-scroll">
        <table className="crud-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Info</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {suppliers.map((it) => (
              <tr key={it.id}>
                <td>{it.name}</td>
                <td>{it.contact}</td>
                <td>
                  <button className="btn-mini" onClick={() => openModal("Edit", it)}>Edit</button>
                  <button className="btn-mini danger" onClick={() => handleDelete(it.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {suppliers.length === 0 && (
              <tr>
                <td colSpan={3} className="empty-table">No suppliers</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modal.open && (
        <div className="modal-bg">
          <div className="modal-card">
            <h3>{modal.mode} Supplier</h3>
            <form onSubmit={handleSubmit}>
              <label>Name: <input name="name" type="text" value={form.name} onChange={handleInput} required /></label>
              <label>Contact: <input name="contact" type="text" value={form.contact} onChange={handleInput} required /></label>
              <div className="modal-actions">
                <button className="btn" type="submit">Save</button>
                <button className="btn secondary" onClick={closeModal} type="button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Suppliers;
