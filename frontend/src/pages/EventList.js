import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Filters from "../Components/Filters";
import API_URL from "../config";

function EventList() {
  const [events, setEvents] = useState([]);

  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [domain, setDomain] = useState("");

  const [domains, setDomains] = useState([]);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/events`, {
        params: {
          ...(city && { city }),
          ...(date && { date }),
          ...(domain && { domain }),
        },
      });

      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  }, [city, date, domain]);

  const fetchDomains = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/events/domains`
      );

      setDomains(response.data);
    } catch (error) {
      console.error("Error fetching domains", error);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
    fetchDomains();
  }, [fetchEvents, fetchDomains]);

  return (
    <div className="container">
      <h1 className="page-title">🎓 College Events</h1>

      <div className="card">
        <Filters
          city={city}
          setCity={setCity}
          date={date}
          setDate={setDate}
          domain={domain}
          setDomain={setDomain}
          domains={domains}
          onApply={fetchEvents}
        />
      </div>

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        events.map((event) => (
          <div className="card event-card" key={event._id}>
            <h3>{event.title}</h3>

            <p>
              <b>College:</b> {event.collegeName}
            </p>

            <p>
              <b>City:</b>{" "}
              {event.city.charAt(0).toUpperCase() + event.city.slice(1)}
            </p>

            <p>
              <b>Domains:</b> {event.domains.join(", ")}
            </p>

            <p>
              <b>Date:</b> {new Date(event.date).toDateString()}
            </p>

            <p>
              <b>Mode:</b> {event.mode}
            </p>

            {event.registrationLink && (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noreferrer"
              >
                <button>Register</button>
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default EventList;