export default function FeatureCard({ title, desc, iconType = "default" }) {
  // Ícones personalizados baseados na identidade do site
  const getIcon = (type) => {
    switch (type) {
      case "certification":
        return (
          <div style={{
            width: "24px",
            height: "24px",
            background: "linear-gradient(135deg, #3B82F6, #1E40AF)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            <div style={{
              width: "12px",
              height: "12px",
              background: "white",
              borderRadius: "2px",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "2px",
                left: "2px",
                width: "8px",
                height: "8px",
                background: "#3B82F6",
                borderRadius: "1px"
              }}></div>
            </div>
          </div>
        );
      case "progress":
        return (
          <div style={{
            width: "24px",
            height: "24px",
            background: "linear-gradient(135deg, #10B981, #059669)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            <div style={{
              width: "16px",
              height: "16px",
              border: "2px solid white",
              borderRadius: "50%",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "2px",
                left: "2px",
                width: "8px",
                height: "8px",
                background: "white",
                borderRadius: "50%"
              }}></div>
            </div>
          </div>
        );
      case "technical":
        return (
          <div style={{
            width: "24px",
            height: "24px",
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            <div style={{
              width: "14px",
              height: "14px",
              background: "white",
              borderRadius: "2px",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "1px",
                left: "1px",
                width: "12px",
                height: "2px",
                background: "#F59E0B",
                borderRadius: "1px"
              }}></div>
              <div style={{
                position: "absolute",
                top: "4px",
                left: "1px",
                width: "12px",
                height: "2px",
                background: "#F59E0B",
                borderRadius: "1px"
              }}></div>
              <div style={{
                position: "absolute",
                top: "7px",
                left: "1px",
                width: "12px",
                height: "2px",
                background: "#F59E0B",
                borderRadius: "1px"
              }}></div>
            </div>
          </div>
        );
      case "resources":
        return (
          <div style={{
            width: "24px",
            height: "24px",
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            <div style={{
              width: "16px",
              height: "16px",
              background: "white",
              borderRadius: "2px",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "2px",
                left: "2px",
                width: "12px",
                height: "2px",
                background: "#8B5CF6",
                borderRadius: "1px"
              }}></div>
              <div style={{
                position: "absolute",
                top: "5px",
                left: "2px",
                width: "12px",
                height: "2px",
                background: "#8B5CF6",
                borderRadius: "1px"
              }}></div>
              <div style={{
                position: "absolute",
                top: "8px",
                left: "2px",
                width: "8px",
                height: "2px",
                background: "#8B5CF6",
                borderRadius: "1px"
              }}></div>
            </div>
          </div>
        );
      default:
        return (
          <div style={{
            width: "24px",
            height: "24px",
            background: "linear-gradient(135deg, #3B82F6, #1E40AF)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              width: "12px",
              height: "12px",
              background: "white",
              borderRadius: "2px"
            }}></div>
          </div>
        );
    }
  };

  return (
    <article className="card">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {getIcon(iconType)}
        <h3>{title}</h3>
      </div>
      <p>{desc}</p>
    </article>
  );
}
