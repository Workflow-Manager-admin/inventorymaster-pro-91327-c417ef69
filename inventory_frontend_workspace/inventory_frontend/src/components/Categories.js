import React, { useState } from "react";
import "../App.css";

// PUBLIC_INTERFACE
function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Office" },
    { id: 2, name: "Stationary" },
  ]);
  const [modal, setModal] = useState({ open: false, mode: null, item: null });
  const [form, setForm] = useState({ name: "" });

  const openModal = (mode, item = null) => {
    setModal({ open: true, mode, item });
    setForm(item ? { ...item } : { name: "" });
  };
  const closeModal = () => setModal({ open: false, mode: null, item: null });

  const handleInput = (e) => {
    setForm({ name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modal.mode === "Add") {
      setCategories((cats) => [
        ...cats,
        { id: Date.now(), ...form },
      ]);
    } else if (modal.mode === "Edit" && modal.item) {
      setCategories((cats) =>
        cats.map((it) => (it.id === modal.item.id ? { ...modal.item, ...form } : it))
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setCategories((its) => its.filter((it) => it.id !== id));
  };

  return (
    <div className="categories-page">
      <div className="crud-title-row">
        <h2>Categories</h2>
        <button className="btn" onClick={() => openModal("Add")}>Add Category</button>
      </div>
      <div className="crud-table-scroll">
        <table className="crud-table">
          <thead>
            <tr>
              <th>Name</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {categories.map((it) => (
              <tr key={it.id}>
                <td>{it.name}</td>
                <td>
                  <button className="btn-mini" onClick={() => openModal("Edit", it)}>Edit</button>
                  <button className="btn-mini danger" onClick={() => handleDelete(it.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={2} className="empty-table">No categories</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modal.open && (
        <div className="modal-bg">
          <div className="modal-card">
            <h3>{modal.mode} Category</h3>
            <form onSubmit={handleSubmit}>
              <label>Name: <input name="name" type="text" value={form.name} onChange={handleInput} required /></label>
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
export default Categories;
