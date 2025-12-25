import "./AboutSection.css";
import logoMain from "../assets/logo-main.png";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-grid">

          {/* LEFT: TEXT CONTENT */}
          <div className="about-content">
            <span className="about-subtitle">About Us</span>

            <h2 className="about-title">
              Trusted Surgical & Medical Equipment Supplier in Nepal
            </h2>

            <p className="about-text">
              Surgical Mart Nepal is a reliable supplier of medical, dental,
              and laboratory equipment, serving clinics, hospitals, and
              healthcare professionals across Nepal.
            </p>

            <p className="about-text">
              With a strong focus on quality, transparency, and accessibility,
              we simplify the sourcing of genuine healthcare products at
              competitive prices.
            </p>

            <ul className="about-features">
              <li>✔ Genuine & certified surgical products</li>
              <li>✔ 500+ products across trusted brands</li>
              <li>✔ Reliable delivery & customer support</li>
            </ul>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="about-image-wrapper">
            <img
              src={logoMain}
              alt="Surgical Mart Nepal logo"
              className="about-image"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
