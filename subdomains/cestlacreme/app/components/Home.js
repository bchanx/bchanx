import React from 'react';
import { Link } from 'react-router';
import Instagram from './Instagram';
import { Break, Bold, Note } from './Common';
import Footer from './Footer';
import { GoogleMapsEmbed } from './GoogleMaps';

var Home = React.createClass({
  render: function() {
    return (
      <div className="home">
        <div>
          <Bold>C'est la Creme</Bold> is an online creme brulee shop, crafting quality desserts for lucky folks in the Vancouver area. Our goal is to source the freshest local ingredients and deliver an indulgence to your taste buds with every bite.
        </div>
        <Break/>
        <Instagram/>
        <Break/>
        <div className="hidden">
          <div>
            We operate solely through online purchases, market pop-ups, and catering for events and weddings.
          </div>
          <br/>
          <Note>
            *Please bear with us as we are limited by the current size of our operations and may sell out!*
          </Note>
          <Break/>
          <div>
            <Bold>How it works:</Bold> Our online schedule runs bi-weekly, with orders closing every other Tuesday at 8pm. The following Thursday (two days later) is pickup day!
            <br/>
            <br/>
            Current pickup point is at the McDonalds parking lot next to the Main Skytrain station (1527 Main St, Vancouver, BC V6A 2W5). Pickup time is between 6pm - 7pm.
          </div>
          <GoogleMapsEmbed placeId="ChIJARg-smZxhlQRfhMPDMXsgL4"/>
          <Break/>
          <div className="pickup">
            <Bold>Next scheduled pickup date:</Bold>
            <br/>
            <div className="pickup-date">
              <Bold>Thursday, February 25th, 6pm - 7pm</Bold>
            </div>
          </div>
          <Break/>
          <div>
            Interested? Check out our&nbsp;
            <Link to="/menu">menu</Link>
            &nbsp;and see what's available for ordering!
          </div>
        </div>
        <Break/>
        <Footer/>
      </div>
    );
  }
})

export default Home;
