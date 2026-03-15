import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    collegeName: "",
    city: "",
    date: "",
    domains: "",
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
    const res = await axios.get("http://localhost:5000/api/events");
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

    if (editingId) {
      await axios.put(
        `http://localhost:5000/api/events/${editingId}`,
        {
          ...formData,
          domains: formData.domains.split(","),
        },
        config
      );
      setEditingId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/events",
        {
          ...formData,
          domains: formData.domains.split(","),
        },
        config
      );
    }

    setFormData({
      title: "",
      collegeName: "",
      city: "",
      date: "",
      domains: "",
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
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchEvents();
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="card">
        <h2>{editingId ? "Edit Event" : "Add Event"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            name="domains"
            placeholder="Domains (comma separated)"
            value={formData.domains}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editingId ? "Update Event" : "Add Event"}
          </button>
        </form>
      </div>

      <h2>All Events</h2>

      {events.map((event) => (
        <div key={event._id} className="card">
          <h3>{event.title}</h3>
          <p>{event.collegeName}</p>
          <p>{event.city}</p>

          <button onClick={() => handleEdit(event)}>Edit</button>

          <button
            style={{ background: "#dc2626" }}
            onClick={() => handleDelete(event._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;