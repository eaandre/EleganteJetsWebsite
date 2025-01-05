export function LiveChatWidget() {
    return (
      <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-full shadow-lg cursor-pointer hover:bg-primary/90 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
        <span className="sr-only">Open Live Chat</span>
      </div>
    )
  }
  
  