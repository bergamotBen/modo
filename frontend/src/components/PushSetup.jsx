import { Button } from "react-bootstrap";
import { Bell, BellSlash } from "react-bootstrap-icons";

export function PushControls({ isSubscribed, loading, subscribe }) {
  if (isSubscribed) {
    return (
      <Button
        disabled={false}
        variant="Link"
        className="text-start text-secondary"
      >
        <BellSlash className="text-secondary me-2" size={20} />
        Turn off notifications
      </Button>
    );
  }

  return (
    <Button
      onClick={subscribe}
      disabled={loading}
      variant="Link"
      className="text-start text-secondary"
    >
      <Bell className="text-secondary me-2" size={20} />

      {loading ? "Registering..." : "Enable Push Notifications"}
    </Button>
  );
}
