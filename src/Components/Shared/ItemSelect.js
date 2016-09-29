import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import '../../css/Shared.css';

class ItemSelect extends Component {
  constructor(props) {
    super(props);
    this.closeOptions = this.closeOptions.bind(this);
    this.state = {
      isOpen: false,
      selectedId: props.selectedItemId || null
    }
  }
  closeOptions() {
    document.removeEventListener('click', this.closeOptions);
    this.setState({ isOpen: false });
  }
  showOptions(e) {
    document.addEventListener('click', this.closeOptions);
    console.log(e.target);
    this.setState({ isOpen: true });
  }
  onSelect(item) {
    this.props.onItemNameSelect(item);
    this.setState({
      isOpen: false,
      selectedId: item.id
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedItemId && nextProps.selectedItemId !== this.state.selectedId) {
      this.setState({
        selectedId: nextProps.selectedItemId
      });
    }
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeOptions);
  }
  render() {
    const options = this.props.sortedItems.length > 0
      ? _.map(this.props.sortedItems, (item, index) => (
        <div
          key={item.id || index}
          className={"option-item " + (this.state.selectedId === item.id && 'option-item-selected')}
          style={ item.color ? { color: item.color } : {}}
          onClick={() => this.onSelect(item, index)}
        >
          {item.name}
        </div>
      ))
      : (
        <div className="option-item">no options available</div>
      );
    const optionBox = (
      <div
        className="option-box"
      >
        {options}
      </div>
    );
    const selectedItem = _.find(this.props.sortedItems,
              {id: this.state.selectedId});
    const selectedItemElement = this.state.isOpen
      ? (
        <div className="selected-item" onClick={this.closeOptions}>
          <span>
          {!_.isNil(this.state.selectedId)
            && selectedItem.name}
          </span>
          <span className="fa fa-caret-up" />
        </div>
      )
      : (
        <div className="selected-item" onClick={(e) => this.showOptions(e)}>
          <span
            style={ _.has(selectedItem, 'color') ? { color: selectedItem.color } : {}}
          >{!_.isNil(this.state.selectedId)
            ? selectedItem.name
            : this.props.defaultMessage
          }</span>
          <span className="fa fa-caret-down" />
        </div>
      );
    return (
      <div className="item-select" style={{ width: this.props.width, height: this.props.height }}>
        {selectedItemElement}
        {this.state.isOpen && optionBox}
      </div>
    );
  }
}

ItemSelect.propTypes = {
  selectedItemId: PropTypes.string,
  sortedItems: PropTypes.array,
  onItemNameSelect: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  defaultMessage: PropTypes.string,
};

ItemSelect.defaultProps = {
  width: 200,
  height: 30,
  defaultMessage: 'pick an item'
}

export default ItemSelect;