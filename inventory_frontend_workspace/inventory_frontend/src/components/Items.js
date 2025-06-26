import React, { useState } from "react";
import "../App.css";

// PUBLIC_INTERFACE
function Items() {
  // Dummy items, replace with backend integration.
  const [items, setItems] = useState([
    { id: 1, name: "Printer Paper", quantity: 3, category: "Office", supplier: "ABC" },
    { id: 2, name: "Black Pens", quantity: 1, category: "Stationary", supplier: "PaperCo" },
  ]);
  const [modal, setModal] = useState({ open: false, mode: null, item: null });
  const [form, setForm] = useState({ name: "", quantity: 1, category: "", supplier: "" });

  const openModal = (mode, item = null) => {
    setModal({ open: true, mode, item });
    setForm(item ? { ...item } : { name: "", quantity: 1, category: "", supplier: "" });
  };
  const closeModal = () => setModal({ open: false, mode: null, item: null });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modal.mode === "Add") {
      setItems((its) => [
        ...its,
        { id: Date.now(), ...form },
      ]);
    } else if (modal.mode === "Edit" && modal.item) {
      setItems((its) =>
        its.map((it) => (it.id === modal.item.id ? { ...modal.item, ...form } : it))
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setItems((its) => its.filter((it) => it.id !== id));
  };

  return (
    <div className="items-page">
      <div className="crud-title-row">
        <h2>Items</h2>
        <button className="btn" onClick={() => openModal("Add")}>Add Item</button>
      </div>
      <div className="crud-table-scroll">
        <table className="crud-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Supplier</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.name}</td>
                <td>{it.quantity}</td>
                <td>{it.category}</td>
                <td>{it.supplier}</td>
                <td>
                  <button className="btn-mini" onClick={() => openModal("Edit", it)}>Edit</button>
                  <button className="btn-mini danger" onClick={() => handleDelete(it.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-table">No items</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modal.open && (
        <div className="modal-bg">
          <div className="modal-card">
            <h3>{modal.mode} Item</h3>
            <form onSubmit={handleSubmit}>
              <label>Name: <input name="name" type="text" value={form.name} onChange={handleInput} required /></label>
              <label>Quantity: <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleInput} required /></label>
              <label>Category: <input name="category" type="text" value={form.category} onChange={handleInput} required /></label>
              <label>Supplier: <input name="supplier" type="text" value={form.supplier} onChange={handleInput} required /></label>
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
export default Items;
