import React from 'react';
import ReactDOM from 'react-dom';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import ReactCreditCard from 'react-credit-card';
import request from 'superagent';
import classNames from 'classnames';
import email from 'email-validator';
import ReactTimerMixin from 'react-timer-mixin';
import { Loading, Break, Button, Note, Bold } from './Common';

var StripeReact = React.createClass({
  mixins: [ReactScriptLoaderMixin, ReactTimerMixin],

  getDefaultProps: function() {
    return {
      product: null,
      selection: null,
      disabled: false,
      orderSuccessful: null,
      updateState: null,
      resetState: null,
      formParams: [{
        type: 'number',
        placeholder: 'Card number'
      }, {
        type: 'name',
        placeholder: 'Full name'
      }, {
        type: 'expiry',
        placeholder: 'MM/YY'
      }, {
        type: 'cvc',
        placeholder: 'CVC'
      }, {
        type: 'email',
        placeholder: 'Email'
      }, {
        type: 'coupon',
        placeholder: 'Coupon code (optional)',
      }, {
        type: 'comments',
        placeholder: 'Additional comments (optional)',
        textarea: true
      }],
      cardDisclosure: 'We do not store any credit card information on our servers. All payments are securely handled with Stripe. Learn more at stripe.com/about.'
    };
  },

  // Internal state
  _: {},
  getInternalState: function() {
    this._ = {
      mounted: false,
      paymentsToggleClicked: false,
      input: {
        number: null,
        name: null,
        expiry: null,
        cvc: null
      },
      backslash: {
        add: false,
        remove: false
      }
    };
  },

  getInitialState: function(opt_force) {
    // Get internal state
    this.getInternalState();
    return {
      loading: !!opt_force ? false : true,
      loadingError: false,
      totalSelected: 0,
      showPayments: false,
      form: {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        email: '',
        coupon: '',
        comments: ''
      },
      focused: 'number',
      error: null
    };
  },

  componentWillReceiveProps: function(nextProps) {
    let totalSelected = Object.keys(nextProps.selection).map(type => nextProps.selection[type].value)
      .reduce((a, b) => a + b);
    let isValidOrder = totalSelected >= this.props.product.minimum && totalSelected <= this.props.product.maximum;
    this.setState({
      totalSelected: totalSelected,
      isValidOrder: isValidOrder,
      showPayments: this.state.showPayments && isValidOrder
    });
  },

  getScriptURL: function() {
    return 'https://js.stripe.com/v2/';
  },

  onScriptLoaded: function() {
    if (this._.mounted) {
      var ready = Stripe && process.env.STRIPE_PUBLISHABLE_KEY;
      this.setState({
        loading: false,
        loadingError: !ready
      });
      if (ready) {
        Stripe.setPublishableKey(process.env.STRIPE_PUBLISHABLE_KEY);
      }
    }
  },

  onScriptError: function() {
    if (this._.mounted) {
      this.setState({
        loading: false,
        loadingError: true
      });
    }
  },

  componentWillUnmount: function() {
    this._.mounted = false;
  },

  componentWillMount: function() {
    this._.mounted = true;
  },

  componentDidUpdate: function() {
    if (this._.paymentsToggleClicked) {
      if (this.state.showPayments) {
        let node = ReactDOM.findDOMNode(this).parentNode.parentNode;
        node.scrollTop = node.scrollHeight;
        let focus = this.state.error && this.state.error.type || 'number';
        if (this._.input[focus]) {
          this._.input[focus].focus();
        }
      }
      this._.paymentsToggleClicked = false;
    }
  },

  togglePayments: function(event) {
    event && event.preventDefault();
    if (this.state.isValidOrder) {
      this._.paymentsToggleClicked = true;
      this.setState({
        showPayments: !this.state.showPayments
      });
    }
  },

  resetOrder: function(event) {
    event && event.preventDefault();
    this.props.resetState();
    this.setState(this.getInitialState(true));
  },

  focusError: function(error) {
    error = error || this.state.error;
    if (this._.input[error.type]) {
      this._.input[error.type].focus();
    }
    this.scrollToBottom();
  },

  onFormChange: function(type, event) {
    if (!this.props.disabled) {
      let form = this.state.form;
      form[type] = event.target.value;
      if (type === 'expiry') {
        if (this._.backslash.add) {
          event.target.value += '/';
          form[type] = event.target.value;
          this._.backslash.add = false;
        }
        else if (this._.backslash.remove) {
          event.target.value = event.target.value.slice(0, event.target.value.length - 1);
          form[type] = event.target.value;
          this._.backslash.remove = false;
        }
      }
      this.setState(form);
    }
  },

  onFocusChange: function(type) {
    if (!this.props.disabled) {
      this.setState({
        focused: type
      });
    }
  },

  validateForm: function() {
    let error = null;
    if (!Stripe.card.validateCardNumber(this.state.form.number)) {
      error = {
        type: 'number',
        message: 'Card number is invalid.'
      };
    }
    else if (!this.state.form.name) {
      error = {
        type: 'name',
        message: 'Name is invalid.'
      };
    }
    else if (!Stripe.card.validateExpiry(this.state.form.expiry)) {
      error = {
        type: 'expiry',
        message: 'Expiry is invalid.'
      };
    }
    else if (!Stripe.card.validateCVC(this.state.form.cvc)) {
      error = {
        type: 'cvc',
        message: 'CVC is invalid.'
      };
    }
    else if (!email.validate(this.state.form.email)) {
      error = {
        type: 'email',
        message: 'Email is invalid.'
      };
    }
    // Returns error if any, otherwise null
    return error;
  },

  scrollToBottom: function() {
    this.setTimeout(() => {
      let node = ReactDOM.findDOMNode(this);
      let content = node.parentNode.parentNode;
      content.scrollTop = content.scrollHeight;
      let app = content.parentNode.parentNode;
      app.scrollTop = app.scrollHeight;
    }, 50);
  },

  submitOrder: function(event) {
    event && event.preventDefault();
    if (!this.state.isValidOrder) {
      this.setState({
        error: {
          message: 'Order selection is invalid.'
        }
      });
      return;
    }

    // Reset errors
    this.setState({
      error: null
    });
    let error = this.validateForm();
    if (error) {
      // Show error
      this.setState({
        error: error
      });
      this.focusError(error);
    }
    else {
      // Things look good, submit!
      this.props.updateState({
        disabled: true
      });
      this.scrollToBottom();

      // Disable payments
      /*
      Stripe.card.createToken({
        number: this.state.form.number,
        name: this.state.form.name,
        exp: this.state.form.expiry,
        cvc: this.state.form.cvc
      }, this.onCreateResponse);*/
    }
  },

  onCreateResponse: function(status, response) {
    if (response.error) {
      // Stripe error
      this.props.updateState({
        disabled: false
      });
      this.setState({
        error: response.error
      });
      this.scrollToBottom();
    }
    else {
      // Send form data to server for charge
      request.post(window.location.origin + '/stripe/order')
        .send({
          stripeToken: response.id,
          created: response.created,
          livemode: response.livemode,
          email: this.state.form.email,
          coupon: this.state.form.coupon,
          comments: this.state.form.comments,
          selection: this.props.selection
        })
        .accept('json')
        .end((error, response) => {
          if (response && response.body && response.body.error) {
            // Charge failed.
            error = response.body.error;
          }
          else if (!(response && response.body && response.body.success)) {
            // No valid response body...
            error = {
              message: 'The charge could not be made.'
            };
          }
          if (error) {
            // Could also be network error. Make sure error message is present.
            error.message = error.message || 'Something went wrong.';
            this.focusError(error);
          }
          this.setState({
            error: error,
            showPayments: !!error
          });
          this.props.updateState({
            disabled: !error,
            orderSuccessful: !error ? response.body : null
          });
        });
    }
  },


  onBlurChange: function(type) {
    if (!this.props.disabled && type === 'cvc') {
      this.setState({
        focused: 'number'
      });
    }
  },

  onFormMount: function(type, input) {
    if (input) {
      this._.input[type] = input;
    }
  },

  _validKeys: [
    8, // backspace
    9, // tab
    13, // enter
    37, 38, 39, 40, // arrows
  ],

  _validNumbers: [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57 // 0-9
  ],

  _validActions: [
    65, // a
    67, // c
    86, // v
    88, // x
    90 // z
  ],

  onKeyDown: function(type, event) {
    if (type === 'number' || type === 'expiry' || type === 'cvc') {
      // Restrict number input keys
      let keyCode = event.keyCode;
      let isValidKey = this._validKeys.indexOf(keyCode) >= 0;
      let isValidNumber = this._validNumbers.indexOf(keyCode) >= 0;
      if (!isValidKey && !isValidNumber) {
        // Not a valid key
        let isValidAction = this._validActions.indexOf(keyCode) >= 0;
        if (!((event.ctrlKey || event.metaKey) && isValidAction)) {
          // Not a valid action either
          event.preventDefault();
        }
      }
      else if ((event.shiftKey || event.altKey) && isValidNumber) {
        // No shift numbers
        event.preventDefault();
      }
      else if (isValidNumber) {
        // We're adding a number!
        let length = event.target.value.length;
        if (type === 'number' && length >= 16) {
          // Restrict maximum card # to 16 digits
          event.preventDefault();
        }
        else if (type === 'expiry') {
          if (length >= 7) {
            // Max expiry is 7 "MM/YYYY"
            event.preventDefault();
          }
          else if (length === 1) {
            // Insert backslash after change
            this._.backslash.add = true;
          }
        }
        else if (type === 'cvc') {
          if (length >= 4) {
            // Max CVC is 4
            event.preventDefault();
          }
        }
      }
      else if (keyCode === 8 && type === 'expiry') {
        if (event.target.value.length === 3 && event.target.value[2] === '/') {
          // Special handling to remove backslash after change
          this._.backslash.remove = true;
        }
      }
    }
  },

  getFormParams: function() {
    return this.props.formParams.map(p => {
      let type = p.type;
      let placeholder = p.placeholder;
      let onChangeHandler = this.onFormChange.bind(this, type);
      let onFocusHandler = this.onFocusChange.bind(this, type);
      let onBlurHandler = this.onBlurChange.bind(this, type);
      let formMountHandler = this.onFormMount.bind(this, type);
      let onKeyDownHandler = this.onKeyDown.bind(this, type);
      return p.textarea ? <textarea
        key={type}
        name={type}
        className="stripe-textarea"
        value={this.state.form[type]}
        placeholder={placeholder}
        disabled={this.props.disabled}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
      /> : <input
        key={type}
        type="text"
        className={classNames("stripe-input", {
          error: this.state.error && this.state.error.type === type
        })}
        placeholder={placeholder}
        disabled={this.props.disabled}
        name={type}
        value={this.state.form[type]}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onKeyDown={onKeyDownHandler}
        ref={formMountHandler}/>;
    });
  },

  loadingMessages: [
    'Preparing Eggs',
    'Adding Vanilla',
    'Blending Cream',
    'Caramelizing Sugar'
  ],

  getLoadingMessage: function() {
    return this.loadingMessages[Math.floor(Math.random() * this.loadingMessages.length)] + '...';
  },

  render: function() {
    let payment = (
      <div>
        <div className={classNames("stripe-payment", {
          active: this.state.showPayments
        })}>
          <div className="stripe-card">
            <ReactCreditCard
              number={this.state.form.number}
              name={this.state.form.name}
              expiry={this.state.form.expiry}
              cvc={this.state.form.cvc}
              focused={this.state.focused}
              shinyAfterBack={this.props.cardDisclosure}/>
          </div>
          <form className="stripe-form">
            {this.getFormParams()}
            {this.state.error ?
              <div className="stripe-form-error">
                <Note><Bold>{this.state.error.message}</Bold></Note>
              </div> : null}
            <Button className="btn-success" onClick={this.submitOrder} disabled={true}>
              {this.props.disabled ? this.getLoadingMessage() : 'Place Order'}
              {this.props.disabled ? <Loading inline={true}/> : null}
            </Button>
            <Button className="btn-default" onClick={this.togglePayments} disabled={this.props.disabled}>Cancel</Button>
          </form>
        </div>
        { this.props.orderSuccessful ?
          <div className="stripe-success">
            <div className="stripe-success-text">
              Hurray! Your order was successfully created! <span className="ion-checkmark"></span>
              <br/>
              { this.props.orderSuccessful.coupon ?
                <div>
                  Coupon code <Bold>{this.props.orderSuccessful.coupon}</Bold> was applied.
                  <br/>
                </div>
                : null }
              Your order number is <Bold className="stripe-order-number">{this.props.orderSuccessful.orderNumber}</Bold>.
              <br/>
              A receipt has been sent to <Bold>{this.state.form.email}</Bold>.
            </div>
            <Button className="btn-success" onClick={this.resetOrder}>Make another order?</Button>
          </div> :
          !this.state.showPayments ?
          <div className="stripe-ready">
            <Button className={classNames({
              "btn-default": !this.state.isValidOrder,
              "btn-success": this.state.isValidOrder
            })} onClick={this.togglePayments} disabled={!this.state.isValidOrder}>Ready to order?</Button>
          </div> : null }
      </div>
    );

    // Disable payments
    /*
    payment = (
      <div>
        We are no longer accepting payments at this time.
        <br/>
        Please <a href="mailto:cestlacreme@gmail.com">contact us</a> if you would like to request a custom order.
        <br/>
        <br/>
        Thank you for your interest.
      </div>
    );*/
    return (
      <div className="stripe">
        { this.state.loading ? <Button disabled="true">Payments Loading...</Button> : this.state.loadingError ? <Button className="btn-danger">Payments Error</Button> : payment }
      </div>
    );
  }
});

export default StripeReact;
