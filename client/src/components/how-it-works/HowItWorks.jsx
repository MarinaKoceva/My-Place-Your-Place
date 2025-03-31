import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <section id="works" className="works">
      <div className="container">
        <div className="section-header">
          <h2>Get started with MyPlaceYourPlace?</h2>
          <p>Find out how our home exchange system works.</p>
        </div>

        <div className="works-content">
          {/* ПЪРВО ИЗОБРАЖЕНИЕ */}
          <div className="single-how-works">
            <img src="/images/sn1.png" alt="Exchange Types" />
            <div className="text-below">
              <h2>Types of exchanges</h2>
              <p>
                There are two types of exchanges: reciprocal and
                non-reciprocal. A reciprocal exchange is when two members
                exchange homes with each other, either at the same time or on
                different dates. But it is also possible to have a
                non-reciprocal exchange by independently searching and renting
                without an exchange.
              </p>
            </div>
          </div>

          {/* ВТОРО ИЗОБРАЖЕНИЕ */}
          <div className="single-how-works">
            <img src="/images/sn4.png" alt="Guest Points" />
            <div className="text-below">
              <h2>More about non-reciprocal exchanges</h2>
              <p>
                The MyPlaceYourPlace system can make your home exchange more
                flexible, simple and easy. Traditional home exchanges (you come
                to my home and I go to yours) are no longer the only option.
                With MyPlaceYourPlace you can travel to a chosen destination,
                book a dream place without hosting a guest in your home. Enjoy
                all the possibilities!
              </p>
            </div>
          </div>
        </div>

        <div className="works-button-wrapper">
          <Link to="/places" className="how-work-btn">
            All places
          </Link>
        </div>
      </div>
    </section>
  );
}
