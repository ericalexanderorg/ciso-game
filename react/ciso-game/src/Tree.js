import React from 'react';
import './Tree.css'; 

class Tree extends React.Component {
  toggle = (event) => {
    const parent = event.target.parentElement;
    parent.querySelector('.nested').classList.toggle('active');
    event.target.classList.toggle('caret-down');
  };

  renderNode = (name, node) => {
    return (
      <li key={name}>
        <span className="caret" onClick={this.toggle}>{name}</span>
        <ul className="nested">
          {node.children && node.children.map(this.renderNode)}
        </ul>
      </li>
    );
  };

  render() {
    return (
      <ul id="myUL">
        {Object.entries(this.props.data).map(([name, node]) => (
            this.renderNode(name, node)
        ))}
      </ul>
    );
  }
}

export default Tree;
