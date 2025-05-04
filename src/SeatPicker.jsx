const renderVIPSection = (section) => {
  const seatCounts = vipConfig[section];
  return (
    <div
      key={section}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 1rem",
        minWidth: "220px",
      }}
    >
      <h4 style={{ marginBottom: "0.25rem" }}>VIP {section}</h4>
      {seatCounts.map((count, rowIdx) => {
        const row = String.fromCharCode(65 + rowIdx);
        const totalWidth = 220; // fixed width for centering
        const seatWidth = 20;
        const totalSeatWidth = count * seatWidth;
        const pad = (totalWidth - totalSeatWidth) / 2;

        return (
          <div
            key={`${section}-${row}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
              width: totalWidth,
              paddingLeft: pad,
            }}
          >
            {Array.from({ length: count }).map((_, i) => {
              const id = `${section}-${row}${i + 1}`;
              return (
                <span
                  key={id}
                  title={id}
                  onClick={() => handleClick(id)}
                  style={{
                    display: "inline-block",
                    width: 16,
                    height: 16,
                    margin: "0 2px",
                    backgroundColor: getColor(id),
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
