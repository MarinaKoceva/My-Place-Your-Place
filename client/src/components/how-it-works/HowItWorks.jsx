export default function HowItWorks() {
  return (
      <section id="works" className="works">
          <div className="container">
              <div className="section-header">
                  <h2>Ready to learn how to get started with MyPlaceYourPlace?</h2>
                  <p>Find out how our home exchange system works.</p>
              </div>

              <div className="works-content">
                  {/* ПЪРВО ИЗОБРАЖЕНИЕ */}
                  <div className="single-how-works">
                      <img src="/images/sn1.png" alt="Exchange Types" />
                      <div className="text-below">
                          <h2>Types of exchanges</h2>
                          <p>There are two types of exchanges: reciprocal and non-reciprocal.
                          A reciprocal exchange is when two members swap homes with each other, whether simultaneously or on different dates. 
                          But it is also possible to have a non-reciprocal exchange using GuestPoints.</p>
                          <button className="how-work-btn">Read More</button>
                      </div>
                  </div>

                  {/* ВТОРО ИЗОБРАЖЕНИЕ */}
                  <div className="single-how-works">
                      <img src="/images/sn4.png" alt="Guest Points" />
                      <div className="text-below">
                          <h2>What are GuestPoints?</h2>
                          <p>The MyPlaceYourPlace GuestPoints system makes exchanging your home more flexible, simple and easy. Traditional home exchanges (you come to my home and I go to your home) are no longer the only option. 
                            MyPlaceYourPlace can host a guest at their home for GuestPoints and use these points later to travel to the destination they prefer.
                            Good news! When you register at MyPlaceYourPlace you will receive some GuestPoints as a welcome gift, so you can test this new way of traveling, and start your MyPlaceYourPlace adventure.</p>
                          <button className="how-work-btn">Read More</button>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
}
