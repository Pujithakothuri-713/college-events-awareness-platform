import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

function AdminDashboard() {
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    collegeName: "",
    city: "",
    date: "",
    domains: "",
    mode: "Online",
    registrationLink: "",
  });

  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchEvents();
    }
  }, [token, navigate]);

  const fetchEvents = async () => {
    const res = await axios.get(`${API_URL}/api/events`);
    setEvents(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const payload = {
      ...formData,
      domains: formData.domains.split(",").map((d) => d.trim()),
    };

    if (editingId) {
      await axios.put(
        `${API_URL}/api/events/${editingId}`,
        payload,
        config
      );

      setEditingId(null);
    } else {
      await axios.post(
        `${API_URL}/api/events`,
        payload,
        config
      );
    }

    setFormData({
      title: "",
      collegeName: "",
      city: "",
      date: "",
      domains: "",
      mode: "Online",
      registrationLink: "",
    });

    fetchEvents();
  };

  const handleEdit = (event) => {
    setEditingId(event._id);

    setFormData({
      title: event.title,
      collegeName: event.collegeName,
      city: event.city,
      date: event.date?.substring(0, 10),
      domains: event.domains.join(","),
      mode: event.mode,
      registrationLink: event.registrationLink || "",
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchEvents();
  };

  const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div
      className="container"
      style={{
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Admin Dashboard
      </h1>

      <div
        className="card"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "30px",
        }}
      >
        <h2>{editingId ? "Edit Event" : "Add Event"}</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            marginTop: "20px",
          }}
        >
          <input
            style={inputStyle}
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            style={inputStyle}
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />

          <input
            style={inputStyle}
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <input
            style={inputStyle}
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            style={inputStyle}
            name="domains"
            placeholder="Domains (comma separated)"
            value={formData.domains}
            onChange={handleChange}
            required
          />

          <input
            style={inputStyle}
            name="registrationLink"
            placeholder="Registration Link"
            value={formData.registrationLink}
            onChange={handleChange}
          />

          <select
            style={inputStyle}
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            required
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <button
            type="submit"
            style={{
              padding: "14px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {editingId ? "Update Event" : "Add Event"}
          </button>
        </form>
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto 0",
        }}
      >
        <h2>All Events</h2>

        {events.map((event) => (
          <div
            key={event._id}
            className="card"
            style={{
              marginTop: "20px",
              padding: "20px",
            }}
          >
            <h3>{event.title}</h3>

            <p>
              <b>College:</b> {event.collegeName}
            </p>

            <p>
              <b>City:</b> {event.city}
            </p>

            <p>
              <b>Mode:</b> {event.mode}
            </p>

            <p>
              <b>Domains:</b> {event.domains.join(", ")}
            </p>

            <button onClick={() => handleEdit(event)}>
              Edit
            </button>

            <button
              style={{
                background: "#dc2626",
                marginLeft: "10px",
              }}
              onClick={() => handleDelete(event._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;