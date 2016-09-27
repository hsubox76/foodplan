import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

class ItemSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedId: props.selectedItemId || null
    }
  }
  showOptions() {
    this.setState({isOpen: true});
  }
  onSelect(item) {
    this.props.onItemNameSelect(item);
    this.setState({
      isOpen: false,
      selectedId: item.id
    });
  }
  render() {
    const options = _.map(this.props.sortedItems, (item, index) =>
      <div
        key={item.id}
        className="option-item"
        onClick={() => this.onSelect(item, index)}
      >
        {item.name}
      </div>
    );
    const optionBox = (
      <div className="option-box">
        {options}
      </div>
    );
    const selectedItem = _.find(this.props.sortedItems,
              {id: this.state.selectedId});
    const selectedItemElement = (
      <div className="selected-item" onClick={() => this.showOptions()}>
        <span>{!_.isNil(this.state.selectedId)
          ? selectedItem.name
          : 'pick an item'
        }</span>
        <span className="fa fa-caret-down" />
      </div>
    );
    return (
      <div className="item-select">
        {this.state.isOpen ? optionBox : selectedItemElement}
      </div>
    );
  }
}

ItemSelect.propTypes = {
  selectedItemId: PropTypes.string,
  sortedItems: PropTypes.array,
  onItemNameSelect: PropTypes.func.isRequired,
};

export default ItemSelect;