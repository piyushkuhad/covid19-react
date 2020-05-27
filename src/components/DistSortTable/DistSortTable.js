import React from 'react';
import '../SortTable/SortTable.css';
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
                    <caption className="cm-card-head fadeInUp">District-wise Data</caption>
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
                              onClick={() => requestSort('deceased')}
                              className={getClassNamesFor('deceased')}
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
                                <i className="cm-state-name">
                                  {item.district}
                                </i>
                                {item.notes ?
                                    <span>
                                        <span 
                                            data-tip
                                            data-event="touchstart mouseover"
                                            data-event-off="mouseleave"
                                            data-for={item.district}
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
                                            id={item.district} place="right"
                                            type="dark"
                                            effect="solid"
                                            multiline={true}
                                            globalEventOff="click"
                                            html = {true}
                                        >
                                            {item.notes}
                                        </ReactTooltip>
                                    </span>
                                    :
                                    ''
                                }
                                
                            </td>
                            <td>
                              {item.delta.confirmed > 0 ? 
                                <span className="isCherry">
                                  (+{item.delta.confirmed})  &nbsp;
                                </span>
                                : ''
                              }
                              {item.confirmed}
                            </td>
                            <td>
                              {item.delta.recovered > 0 ? 
                                <span className="isGreen">
                                  (+{item.delta.recovered}) &nbsp;
                                </span>
                                : ''
                              }
                              {item.recovered}
                            </td>
                            <td>{item.active}</td>
                            <td>
                              {item.delta.deceased > 0 ? 
                                <span className="isGrey">
                                  (+{item.delta.deceased})  &nbsp;
                                </span>
                                : ''
                              }
                              {item.deceased}
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

export default function DistSortTable({ district_wise_total_data }) {
  console.log(district_wise_total_data);
    for(let i=0; i< district_wise_total_data.length; i++) {
        district_wise_total_data[i].confirmed = Number(district_wise_total_data[i].confirmed);
        district_wise_total_data[i].delta.confirmed = Number(district_wise_total_data[i].delta.confirmed);
        district_wise_total_data[i].recovered = Number(district_wise_total_data[i].recovered);
        district_wise_total_data[i].delta.recovered = Number(district_wise_total_data[i].delta.recovered);
        district_wise_total_data[i].active = Number(district_wise_total_data[i].active);
        district_wise_total_data[i].deceased = Number(district_wise_total_data[i].deceased);
        district_wise_total_data[i].delta.deceased = Number(district_wise_total_data[i].delta.deceased);
    } 
    //console.log(statewise_total_data);
  return (
    <div className="sortTable">
      
      <ProductTable
        products={district_wise_total_data} 
      />
    </div>
  );
}
