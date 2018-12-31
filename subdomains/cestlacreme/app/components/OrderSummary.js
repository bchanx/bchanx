import React from 'react';
import classNames from 'classnames';
import { Bold, Note } from './Common';

var OrderSummary = React.createClass({
  getDefaultProps: function() {
    return {
      product: null,
      selection: null,
      orderSuccessful: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    let totalSelected = Object.keys(nextProps.selection)
      .map(type => nextProps.selection[type].value)
      .reduce((a, b) => a + b);
    let success = nextProps.orderSuccessful;
    let totalCharged = ((success && success.charge && success.charge.amount || (totalSelected * this.props.product.price))/100).toFixed(2);
    this.setState({
      totalSelected: totalSelected,
      totalCharged: totalCharged
    });
  },

  getInitialState: function() {
    return {
      totalSelected: 0,
      totalCharged: 0.00
    };
  },

  render: function() {
    let items = Object.keys(this.props.selection);
    return (
      <div className={classNames("order-summary", {
        success: this.props.orderSuccessful
      })}>
        <div className="order-icon">
          <span className="ion-spoon"></span>
        </div>
        <div className="order-title">
          <Bold>{!this.state.totalSelected ? <span className="warning">You currently have no items selected.</span> : this.props.orderSuccessful ? 'You have successfully ordered:' : 'You have currently selected:'}</Bold>
        </div>
        {this.state.totalSelected ?
          <div>
            {(() => {
              return items.filter(itm => {
                return this.props.selection[itm].value;
              }).map(itm => {
                return (
                  <div key={itm} className="order-item">
                    {this.props.selection[itm].name} x {this.props.selection[itm].value}
                    <span className="order-price">${(this.props.selection[itm].value * this.props.product.price/100).toFixed(2)}</span>
                  </div>
                );
              });
            })()}
            <div className="order-total">
              {this.state.totalSelected < this.props.product.minimum ? <div className="order-warning"><Note><Bold>*Minimum $20.00 required*</Bold></Note></div> : null}
              <Bold>
                Total: ${(this.state.totalCharged)}
              </Bold>
            </div>
          </div> : null}
      </div>
    );
  }
});

export default OrderSummary;
