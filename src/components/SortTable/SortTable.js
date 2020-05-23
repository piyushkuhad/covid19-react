import React from 'react';
import './SortTable.css';
import ReactTooltip from 'react-tooltip';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <div className="cm-sortTable-container">
        <div className="container">
            <div className="cm-card-container">
                <table>
                    <caption className="cm-card-head">Statewise Data</caption>
                    <thead>
                        <tr>
                          <th>
                              <button
                              type="button"
                              onClick={() => requestSort('state')}
                              className={getClassNamesFor('state')}
                              >
                              State
                              </button>
                          </th>
                          <th>
                              <button
                              type="button"
                              onClick={() => requestSort('confirmed')}
                              className={getClassNamesFor('confirmed')}
                              >
                              Cases
                              </button>
                          </th>
                          <th>
                              <button
                              type="button"
                              onClick={() => requestSort('recovered')}
                              className={getClassNamesFor('recovered')}
                              >
                              Recovered
                              </button>
                          </th>                        
                          <th>
                              <button
                              type="button"
                              onClick={() => requestSort('active')}
                              className={getClassNamesFor('active')}
                              >
                              Active
                              </button>
                          </th>
                          <th>
                              <button
                              type="button"
                              onClick={() => requestSort('deaths')}
                              className={getClassNamesFor('deaths')}
                              >
                              Deaths
                              </button>
                          </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item.state}
                                {item.statenotes ?
                                    <span>
                                        <span 
                                            data-tip
                                            data-event="touchstart mouseover"
                                            data-event-off="mouseleave"
                                            data-for={item.state}
                                        >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="24" height="24" viewBox="0 0 24 24" 
                                                fill="none" stroke="currentColor" 
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                            </svg>
                                        </span>
                                        <ReactTooltip 
                                            id={item.state} place="right"
                                            type="dark"
                                            effect="solid"
                                            multiline={true}
                                            globalEventOff="click"
                                            html = {true}
                                        >
                                            {item.statenotes}
                                        </ReactTooltip>
                                    </span>
                                    :
                                    ''
                                }
                                
                            </td>
                            <td>
                              {item.deltaconfirmed > 0 ? 
                                <span className="isCherry">
                                  (+{item.deltaconfirmed})  &nbsp;
                                </span>
                                : ''
                              }
                              {item.confirmed}
                            </td>
                            <td>
                              {item.deltarecovered > 0 ? 
                                <span className="isGreen">
                                  (+{item.deltarecovered}) &nbsp;
                                </span>
                                : ''
                              }
                              {item.recovered}
                            </td>
                            <td>{item.active}</td>
                            <td>
                              {item.deltadeaths > 0 ? 
                                <span className="isGrey">
                                  (+{item.deltadeaths})  &nbsp;
                                </span>
                                : ''
                              }
                              {item.deaths}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
            </div>
        </div>
    </div>
  );
};

export default function SortTable({ statewise_total_data }) {
    for(let i=0; i< statewise_total_data.length; i++) {
        statewise_total_data[i].confirmed = Number(statewise_total_data[i].confirmed);
        statewise_total_data[i].deltaconfirmed = Number(statewise_total_data[i].deltaconfirmed);
        statewise_total_data[i].recovered = Number(statewise_total_data[i].recovered);
        statewise_total_data[i].deltarecovered = Number(statewise_total_data[i].deltarecovered);
        statewise_total_data[i].active = Number(statewise_total_data[i].active);
        statewise_total_data[i].deaths = Number(statewise_total_data[i].deaths);
        statewise_total_data[i].deltadeaths = Number(statewise_total_data[i].deltadeaths);
    } 
    //console.log(statewise_total_data);
  return (
    <div className="sortTable">
      
      <ProductTable
        products={statewise_total_data} 
      />
    </div>
  );
}
