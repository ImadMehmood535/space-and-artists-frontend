import React, { Component } from 'react';
import TooltipItem from './TooltipItem';

class TooltipComponent extends Component {
  render() {
    let type = 1;
    switch (type) {
      case 1:
        return (
          <TooltipItem
            className={this.props.className}
            simple
            key={'Tool' + Math.floor(Math.random() * Math.floor(100000))}
            id={Math.floor(Math.random() * Math.floor(100000))}
            item={{
              placement: 'top',
              text: this.props.children,
              body: this.props.title,
            }}
          />
        );
      case 2:
        return <abbr title={this.props.title}>{this.props.children}</abbr>;
      default:
        return <p>Sorry</p>;
    }
  }
}
export default TooltipComponent;
