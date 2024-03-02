import React from 'react';

const EssentialItemsGrid = ({ essentialItems, selectedItems }) => {
  return (
    <div>
      <div className="grid">
        {essentialItems.map(item => {
          const isSelected = selectedItems.includes(item.title);

          return (
            <div key={item.id} className="tile">
              {isSelected ? (
                <div>
                  <h3><span style={{ color: 'green' }}>✓&nbsp;</span>{item.title}</h3>
                  {item.explanation}
                </div>
              ) : (
                <div>
                  <h3><span style={{ color: 'red' }}>✗&nbsp;</span>{item.title}</h3>
                  <p>{item.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EssentialItemsGrid;
