import React from 'react';

function FilterTabs({ current, setFilter }) {
  const tabs = ['Active', 'Completed'];

  return (
    <div className="filter-tabs">
      {tabs.map(tab => {
        const className =
          tab === 'Active' && current === tab
            ? 'active'
            : tab === 'Completed' && current === tab
            ? 'completed-active'
            : '';

        return (
          <button
            key={tab}
            className={className}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;

