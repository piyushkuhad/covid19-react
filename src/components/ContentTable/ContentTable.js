import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }, ]

// const columns = [
//   {
//     name: 'Title',
//     selector: 'title',
//     sortable: true,
//   },
//   {
//     name: 'Year',
//     selector: 'year',
//     sortable: true,
//     right: true,
//   },
// ];

class ContentTable extends Component {
    constructor(props){
        super(props);
        let statewiseData = props.statewise_total_data.slice(1);
        console.log(statewiseData);
        this.state = {
            data: statewiseData,
            test: props.test,
            columns : [
                {
                  name: 'State',
                  selector: 'state',
                  sortable: true,
                },
                {
                  name: 'Cases',
                  selector: 'confirmed',
                  sortable: true,
                  right: true,
                },
                {
                    name: 'New Cases',
                    selector: 'deltaconfirmed',
                    sortable: true,
                },
                {
                    name: 'Recovered',
                    selector: 'recovered',
                    sortable: true,
                },
                {
                    name: 'New Recovered',
                    selector: 'deltarecovered',
                    sortable: true,
                },
                {
                    name: 'Active',
                    selector: 'active',
                    sortable: true,
                },
                {
                    name: 'Deaths',
                    selector: 'deaths',
                    sortable: true,
                },
                {
                    name: 'New Deaths',
                    selector: 'deltadeaths',
                    sortable: true,
                },
            ]
        }
    } 
    
    render(){
        return(
            <div className="cm-ContentTable-container">
                <div className="container">
                    <div className="cm-card-container">
                        <DataTable
                            title="Statewise Data"
                            columns={this.state.columns}
                            data={this.state.data}
                            fixedHeader
                            
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentTable;