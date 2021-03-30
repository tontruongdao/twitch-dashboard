import React from 'react'
import { Bar }from 'react-chartjs-2'

import Spinner from './Spinner'


const Chart = ({data}) => {

    const dotaData = data.find(game => game.id === "29595");
    const heartData = data.find(game => game.id === "138585");
    const rocketData = data.find(game => game.id === "30921");

        return (
            <div>
                <h1> ChartJS</h1>
                {dotaData ? (
                <>
                    {/* <div>
                        {dotaData.name}
                    </div> */}
                    <Bar 
                        data={{
                            labels: [`${dotaData.name}}`, `${heartData.name}`, `${rocketData.name}`],
                            datasets: [
                                {
                                    label: "# of viewers",
                                    data: [`${dotaData.total_views}`, `${heartData.total_views}`, `${rocketData.total_views}`],
                                    backgroundColor: ['lightblue', 'lightcoral', 'lightseagreen'],
                                    borderWidth: 3
                                }
                            ]
                        }}
                        height={500}
                        width={1000}
                        options= {{
                            // maintainAspectRatio : false
                            responsive: true,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }}
                    />
                </>
                ) : (
                <div>
                <Spinner/>
                </div>
                )}
            </div>
        )
}

export default Chart