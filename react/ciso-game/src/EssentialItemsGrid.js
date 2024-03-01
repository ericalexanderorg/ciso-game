import React from 'react';

const EssentialItemsGrid = ({ essentialItems, selectedItems }) => {
  return (
    <div className="grid">
      {essentialItems.map(item => {
        const isSelected = selectedItems.includes(item.title);

        return (
          <div key={item.id} className="tile">
            {isSelected ? (
              <div>
                <span style={{ color: 'green' }}>✓</span><h3>{item.title}</h3>
                {item.explanation}
              </div>
            ) : (
              <div>
                <span style={{ color: 'red' }}>✗</span><h3>{item.title}</h3>
                <p>{item.explanation}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EssentialItemsGrid;
