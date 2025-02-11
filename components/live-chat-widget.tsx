"use client"; // Ensures the component runs on the client side

export function LiveChatWidget() {
  const openWhatsApp = () => {
    window.open("https://wa.me/2349024133349", "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-full shadow-lg cursor-pointer hover:bg-primary/90 transition-transform transform hover:scale-105"
      onClick={openWhatsApp}
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      {/* Exact WhatsApp Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"  // Ensures it adapts to light/dark mode
      >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 2.1.6 4 1.6 5.6L2 22l4.4-1.6c1.6 1 3.5 1.6 5.6 1.6 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.8 0-3.5-.5-4.9-1.4l-.3-.2-2.6.9.9-2.5-.2-.3C3.5 14.5 3 13.3 3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9zm4.5-5.2c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.2.2-.6.7-.7.8-.1.1-.3.1-.5 0-1.5-.6-2.8-1.7-3.7-3.2-.1-.2-.1-.4.1-.5.1-.1.3-.4.4-.5.1-.2.2-.4.3-.5s0-.3 0-.4c0-.1-.5-1.2-.7-1.7-.2-.5-.4-.4-.5-.4h-.4c-.1 0-.3 0-.5.2s-.7.6-.7 1.6c0 .9.7 1.9.8 2.1s1.5 2.6 3.9 3.6c1.9.8 2.3.8 3.1.7s1.5-.7 1.7-1.3c.2-.5.2-1-.1-1.1z"/>
      </svg>

      <span className="sr-only">Chat on WhatsApp</span>
    </div>
  );
}
