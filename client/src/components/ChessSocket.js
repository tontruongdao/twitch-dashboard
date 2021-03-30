import React from 'react'
import Spinner from './Spinner'

const ChessSocket = ({data}) => {

    const chessData = data.find(game => game.id === "743");

    return (
        <div>
            <h1> Chess Views</h1>
            {chessData ? (
            <>
                <div>
                    <div>{chessData.name}</div>
                    <div>Total Views: {chessData.total_views}</div>
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

export default ChessSocket

