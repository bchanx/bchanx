import React from 'react';
import { Break, Bold, Note } from './Common';
import { GoogleMapsEmbed } from './GoogleMaps';
import FAQ from './FAQ';

var About = React.createClass({
  render: function() {
    return (
      <div className="about">
        <div>
          <Bold>Hi! I'm Samson, creator of C'est la Creme!</Bold>
          <div className="about-me-picture"> </div>
          I love food. For as long as I can remember I've been eating my way through all different ethnic cuisines! I started cooking for myself ever since I was little and have always been cooking as a hobby. One day I decided to make my mom's favorite dessert - the <Bold>Creme Brulee</Bold>.
          <br/>
          <br/>
          As an engineer by day, and an amateur foodie at night, I've often dreamt about making something special and sharing it with everyone. 
          <br/>
          <br/>
          Well, here it is: My goal is to make the absolute best creme brulee I can make with the best ingredients I can find. That's it!
        </div>
        <Break/>
        <div className="faq">
          <div className="faq-title">
            <Bold>F.A.Q</Bold>
          </div>
          <FAQ question={"How do I create the sugar glaze on top?"}>
            Dab the surface of the creme brulee with a paper towel to rid of any moisture, then spread 3/4 to a 1 teaspoon of white sugar on top evenly.
            <br/>
            <br/>
            Next, grab a food torch on medium flame, and gently melt the sugar until browned! Alternatively, you can set the oven to "Broil" with the temperature at 500F, then place the creme brulee on the top rack for 5-10 minutes or until golden brown and bubbling.
            <br/>
            <br/>
            Finally, let sit for 10 minutes and eat! Or, if a cold creme brulee is desired, place the jars back into the fridge for up to 30 minutes and serve. Although the longer you wait, the softer the sugar crust will get.
            <br/>
            <br/>
            <Note>
              *Please be safe!!! If you are torching and have an open flame, please do so at your own risk and be fire safe ready.*
            </Note>
          </FAQ>
          <FAQ question={"Can you make me a custom flavor?"}>
            <a href="mailto:cestlacreme@gmail.com">Email us</a>! Let's make it happen!
            <br/>
            <br/>
            <Note>
              *Please note, we will try our best to accommodate but may be restricted by minimum quantities and flavor limitations.*
            </Note>
          </FAQ>
          <FAQ question={"How many can I order?"}>
            Each order requires a <Bold>minimum of 4</Bold>, and a <Bold>maximum of 12</Bold> creme brulee's.
            <br/>
            <br/>
            For larger quantities, please <a href="mailto:cestlacreme@gmail.com">email us</a> and request for a special order.
          </FAQ>
          <FAQ question={"When and where is pickup?"}>
            Orders are collected bi-weekly, closing on <Bold>8pm PST Tuesday</Bold> every other week. Pickup is scheduled for the Thursday right after orders close. Orders after each deadline will be scheduled for pickup the Thursday two weeks after.
            <br/>
            <br/>
            Pickup location is at the McDonalds parking lot, next to the Main Skytrain station.
            <br/>
            The exact address is <Bold>1527 Main St, Vancouver, BC V6A 2W5</Bold>.
            <br/>
            Pickup time is between <Bold>6pm - 7pm</Bold>.
            <GoogleMapsEmbed placeId="ChIJARg-smZxhlQRfhMPDMXsgL4"/>
            If things are unclear, or you'd like to schedule an order for a later date, send us an <a href="mailto:cestlacreme@gmail.com">email</a>.
          </FAQ>
          <FAQ question={"What happens if I miss the weekly meetup for my order?"}>
            Things happen, we understand.
            <br/>
            <br/>
            <a href="mailto:cestlacreme@gmail.com">Email us</a> with your <Bold>order number</Bold> and we'll reschedule your pickup time.
          </FAQ>
          <FAQ question={"Can we keep the jars?"}>
            Of course! However we gladly accept returns as we can clean and sustainably re-use the jars. Meet us at our drop off if you decide to do so!
          </FAQ>
        </div>
      </div>
    );
  }
});

export default About;
