// components/Loader.jsx
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
  return (
    <div
      style={{
        minHeight: "300px",
        display: "flex",
        alignItems: "center",
        marginLeft:"570px",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}
