import React from 'react'
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
                    <div>
                        {dotaData.name}
                    </div>
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