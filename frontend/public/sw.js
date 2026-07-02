// 1. Listen for push events
self.addEventListener("push", (event) => {
  // Default payload
  let data = { title: "Notification", body: "You have a new message!" };

  if (event.data) {
    try {
      // Overwrite default payload with the event data
      data = event.data.json();
    } catch (e) {
      // Fallback to plain text if it's not JSON
      data = { title: "Notification", body: event.data.text() };
    }
  }

  // 3. Display the banner
  const options = {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// 4. Handle interaction: redirect or open
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // If the app is already open, focus it
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) {
            return client.focus();
          }
        }
        // Else open a new PWA instance
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      }),
  );
});
