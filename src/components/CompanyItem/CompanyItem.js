import React, { Component, PropTypes } from 'react';
import ClickOutside from 'react-click-outside';
import ImmutablePropTypes from 'react-immutable-proptypes';


const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  editItemInList: PropTypes.func.isRequired,
  removeItemFromList: PropTypes.func.isRequired
};


class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
    this.editItemInList = this.editItemInList.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
  }

  setEditMode(state) {
    return (ev) => {
      ev.stopPropagation();
      if (this.state.editMode && !state) {
        this.editItemInList();
      }
      this.setState({ editMode: state }, () => {
        if (state) {
          this.node.focus();
        }
      });
    };
  }

  editItemInList() {
    const value = this.node.value;
    const item = this.props.item;
    if (value !== `${item.get('companyName')}`) {
      console.log(value)
      this.props.editItemInList(item.get('id'), { value });
    }
  }

  render() {
    const { item, removeItemFromList } = this.props;
    const { editMode } = this.state;

    return (
      <li className="list-group-item">
        {(item.get('removeInprocess') || (item.get('editInprocess'))) &&
          <span>In process...</span>
        }
        <span style={{ marginLeft: '10px', marginRight: '10px' }}>
          {editMode ?
            <ClickOutside onClickOutside={this.setEditMode(false)} style={{ display: 'inline' }}>
              <input
                defaultValue={`${item.get('companyName')}`}
                ref={(c) => { this.node = c; }}
              />
            </ClickOutside> :
            <span>
              {item.get('companyName')}
            </span>
          }
        </span>
        {editMode ?
          <button>Save</button> :
          <button onClick={this.setEditMode(true)} >Edit</button>
        }
        <button
          style={{ marginLeft: '10px' }}
          onClick={removeItemFromList}
          disabled={item.get('removeInprocess')}
        >
          Delete
        </button>
      </li>
    );
  }
}


ListItem.propTypes = propTypes;


export default ListItem;
