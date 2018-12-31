import React from 'react';
import { Break, Bold } from './Common';
import Stripe from './Stripe';
import MenuItems from './MenuItems';
import OrderSummary from './OrderSummary';

var PRODUCT = {
  price: 500, // cents
  minimum: 4,
  maximum: 12
};

var Menu = React.createClass({
  getInitialState: function() {
    return {
      selection: {
        vanilla: {
          name: 'Vanilla',
          value: 0
        },
        matcha: {
          name: 'Matcha',
          value: 0
        },
        earlgrey: {
          name: 'Earl Grey',
          value: 0
        }
      },
      disabled: false,
      orderSuccessful: null
    };
  },

  updateState: function(state) {
    this.setState(state);
  },

  resetState: function() {
    this.setState(this.getInitialState());
  },

  onSelectionChange: function(name, val) {
    let selection = this.state.selection;
    selection[name].value = val.value;
    this.setState(selection);
  },

  render: function() {
    return (
      <div className="menu">
        <div>
          Our creme brulee's are sold at a flat rate of ${PRODUCT.price/100} each. However due to the nature of our business, we require at least {PRODUCT.minimum} brulee's per order, meaning a <Bold>minimum ${PRODUCT.price/100 * PRODUCT.minimum} purchase</Bold>.
          <br/>
          <br/>
          Flavors can be mixed and matched to your preference.
          <br/>
          <br/>
          (For orders of more than a dozen, please <a href="mailto:cestlacreme@gmail.com">email us</a> to set up a specialty order.)
        </div>
        <Break/>
        <MenuItems
          product={PRODUCT}
          selection={this.state.selection}
          onSelectionChange={this.onSelectionChange}
          disabled={this.state.disabled}/>
        <OrderSummary
          product={PRODUCT}
          selection={this.state.selection}
          orderSuccessful={this.state.orderSuccessful}/>
        <Break/>
        <Stripe
          product={PRODUCT}
          selection={this.state.selection}
          disabled={this.state.disabled}
          orderSuccessful={this.state.orderSuccessful}
          updateState={this.updateState}
          resetState={this.resetState}/>
      </div>
    );
  }
});

export default Menu;
