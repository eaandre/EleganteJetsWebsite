export function GoogleMap() {
  return (
      <div className="w-full h-96 bg-gray-200 relative">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.4985742215523!2d7.495082214793598!3d9.057851391787063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0a5e08a3f63d%3A0x7c23c156e9ef5f6c!2sAbuja%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1651234567890!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
      </div>
  );
}
