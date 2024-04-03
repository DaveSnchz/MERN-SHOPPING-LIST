import React, { Component } from 'react';
import { Container, Button, ListGroup, ListGroupItem, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

  componentDidMount() {
    this.props.getItems();
  }

  editItem = (id, newName) => {
    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    }));
  };

  handleSearchInputChange = (e) => {
    const searchInput = e.target.value;
    this.setState({ searchInput });
  };

  render() {
    const { items, searchInput } = this.props.item;
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <Button
              color="dark"
              onClick={() => {
                const name = prompt('Enter Item');
                if (name) {
                  this.setState((prevState) => ({
                    items: [...prevState.items, { id: uuidv4(), name }]
                  }));
                }
              }}
            >
              Add Item
            </Button>
          </div>
          <div>
            <Input
              type="text"
              value={searchInput}
              onChange={this.handleSearchInputChange}
              placeholder="Search..."
              style={{ marginRight: '0.5rem' }}
            />
          </div>
        </div>

        <ListGroup>
          <TransitionGroup classNames="shoppinglist">
            {filteredItems.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{name}</span>
                    <div>
                      <Button
                        className="edit-btn"
                        color="secondary"
                        size="sm"
                        style={{ marginRight: '0.5rem' }}
                        onClick={() => {
                          const newName = prompt('Edit Item', name);
                          if (newName) {
                            this.editItem(id, newName);
                          }
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={() => {
                          this.setState((prevState) => ({
                            items: prevState.items.filter((item) => item.id !== id)
                          }));
                        }}
                      >
                        &times;
                      </Button>
                    </div>
                  </div>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems })(ShoppingList);