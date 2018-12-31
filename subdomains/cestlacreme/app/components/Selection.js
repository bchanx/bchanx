import React from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import Carousel from './Carousel';

var Selection = React.createClass({

  getDefaultProps: function() {
    return {
      type: null, // earlgrey
      images: null,
      selection: null,
      product: null,
      onChange: null,
      disabled: false,
      onClick: null
    };
  },

  getOptions: function() {
    let othersSelected = Object.keys(this.props.selection).filter(s => s !== this.props.type)
      .map(s => this.props.selection[s].value)
      .reduce((a, b) => a + b);
    let options = [];
    for (let i = 0; i <= this.props.product.maximum - othersSelected; i++) {
      options.push({
        value: i,
        label: String(i)
      });
    }
    return options;
  },

  render: function() {
    return (
      <div>
        <div className="menu-images">
          <Carousel
            images={this.props.images}
            onCarouselClick={this.props.onClick}/>
        </div>
        <div className="menu-options">
          <div className="menu-caption">{this.props.selection[this.props.type].name}</div>
          <Select
            name={this.props.type + '-select'}
            searchable={false}
            clearable={false}
            value={this.props.selection[this.props.type].value}
            options={this.getOptions()}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
          />
        </div>
      </div>
    );
  }
});

export default Selection;
