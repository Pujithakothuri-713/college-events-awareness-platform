function Filters({
  city,
  setCity,
  date,
  setDate,
  domain,
  setDomain,
  domains = [],
  onApply,
}) {
  return (
    <div className="filters-container">
      <h3 className="filter-title">🔍 Filter Events</h3>

      <div className="filter-row">

        <div className="form-group">
          <label>City</label>
          <input
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Domain</label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            <option value="">All Domains</option>

            {domains.map((d, i) => (
              <option key={i} value={d}>
                {d.replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-button">
          <button onClick={onApply}>Apply Filters</button>
        </div>

      </div>
    </div>
  );
}

export default Filters;