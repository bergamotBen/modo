// PushControls.jsx
export function PushControls({ isSubscribed, loading, subscribe }) {
  if (isSubscribed) {
    return <p style={{ color: "green" }}>Device registered</p>;
  }

  return (
    <button onClick={subscribe} disabled={loading}>
      {loading ? "Registering..." : "Enable Push Notifications"}
    </button>
  );
}
