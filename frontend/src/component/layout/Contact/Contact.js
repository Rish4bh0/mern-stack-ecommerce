import React from "react";

const Contact = () => {
  return (
    <section style={{ padding: "9rem 0 5rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem"}}>
        <h2 className="common-heading">We'd Love to Hear From You</h2>
        <p>Send us a message</p>
      </div>

      <div className="map-container">
        <iframe
          title="Google Maps Embed"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.9595763919283!2d85.34809858763631!3d27.718534351085083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ba03c171c7%3A0x832472724c436d8b!2sSam%20Prolife%20Nutrition%20Nepal%20and%20Gym%20and%20Fitness%20Equipment%20Supplier!5e0!3m2!1sen!2snp!4v1685099884192!5m2!1sen!2snp"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div style={{ marginTop: "6rem", textAlign: "center" }}>
        <div style={{ maxWidth: "50rem", margin: "auto" }}>
          <form
            action="https://formspree.io/f/xpzeekoz"
            method="POST"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <label htmlFor="username" style={{ marginBottom: "0.5rem" , marginRight: "2000px"}}>
              Name
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              autoComplete="off"
              required
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "1rem",
              }}
            />

            <label htmlFor="email" style={{ marginBottom: "0.5rem", marginRight: "2000px" }}>
              Email
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Enter your email"
              autoComplete="off"
              required
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "1rem",
              }}
            />

            <label htmlFor="message" style={{ marginBottom: "0.5rem", marginRight: "2000px" }}>
              Message
            </label>
            <textarea
              name="message"
              cols="30"
              rows="6"
              autoComplete="off"
              required
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "1rem",
              }}
            ></textarea>

            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
