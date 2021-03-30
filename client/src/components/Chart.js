import React from 'react'
import { Bar }from 'react-chartjs-2'
import styled from 'styled-components';

import { theme } from './THEMES'
import Spinner from './Spinner'


const Chart = ({data}) => {

    const dotaData = data.find(game => game.id === "29595");
    const heartData = data.find(game => game.id === "138585");
    const rocketData = data.find(game => game.id === "30921");

        return (
            <Wrapper>
                {dotaData ? (
                <>
                    {/* <div>
                        {dotaData.name}
                    </div> */}
                    <Bar 
                        data={{
                            labels: [`${dotaData.name}`, `${heartData.name}`, `${rocketData.name}`],
                            datasets: [
                                {
                                    label: "# of viewers",
                                    data: [`${dotaData.total_views}`, `${heartData.total_views}`, `${rocketData.total_views}`],
                                    backgroundColor: ['lightblue', 'lightcoral', 'lightseagreen'],
                                    borderWidth: 3
                                }
                            ]
                        }}
                        height={100}
                        width={400}
                        options= {{
                            // maintainAspectRatio : false,
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
            </Wrapper>
        )
}

const Wrapper = styled.div`
    background-color: ${theme.primaryLight};
    flex:5;
    margin: 3vh 3vw;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 1rem 1rem ${theme.primaryLight};
`

export default Chart