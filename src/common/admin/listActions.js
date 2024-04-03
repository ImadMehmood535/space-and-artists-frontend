import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import TooltipComponent from './TooltipComponent';
class ListActions extends Component {
  render() {
    let type = 1;
    switch (type) {
      case 1:
        return this.props.actionsData.map(({ to, title, icon, onClick, id }) => (
          <Link to={to ? to : '#'} onClick={() => onClick(id)} key={title}>
            <TooltipComponent className='p-1' title={title}>
              <i className={icon + ' color-theme-1'} style={{ fontSize: 18 }} />
            </TooltipComponent>{' '}
          </Link>
        ));
      case 2:
        return (
          <UncontrolledDropdown outline size='xs'>
            <DropdownToggle caret size='xs' outline color='primary'>
              Action
            </DropdownToggle>
            <DropdownMenu left>
              {this.props.actionsData.map((action) => (
                <Link to={action.to ? action.to : '#'}>
                  <DropdownItem caret size='xs' outline color='primary' className='btn btn-outline-primary btn-xs'>
                    <i className={action.icon} /> {action.title}
                  </DropdownItem>
                </Link>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      default:
        return <p>Sorry</p>;
    }
  }
}

export default ListActions;
