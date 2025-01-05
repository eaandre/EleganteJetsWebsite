export function GoogleMap() {
    return (
      <div className="w-full h-96 bg-gray-200 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5272843211647!2d7.258933514878817!3d9.006248391787502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e745f4cd62fd9%3A0x5f99eb1a5b52ac1e!2sNnamdi%20Azikiwe%20International%20Airport!5e0!3m2!1sen!2sng!4v1651234567890!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    )
  }
  
  