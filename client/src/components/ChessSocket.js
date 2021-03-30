import React from 'react'
import Spinner from './Spinner'
import styled from 'styled-components';
import { theme } from './THEMES'

const ChessSocket = ({data}) => {

    const chessData = data.find(game => game.id === "743");

    return (
        <Wrapper>
            {chessData ? (
            <>
                <Container>
                    <Header>{chessData.name}</Header>
                    <Text>Total Views: {chessData.total_views}</Text>
                </Container>
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
    flex: 2;
    padding: 3vh 3vw;
    background-color: ${theme.primaryLight};
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 1rem 1rem ${theme.primaryLight};
`
const Container = styled.div`

`

const Header = styled.div`
    font-size: 2rem;
    letter-spacing: 3px;
    text-align: center;
    font-family: 'Orbitron', sans-serif;
`

const Text = styled.div`
    font-size: 1.5rem;
    letter-spacing: 2px;
    text-align: center;
    font-family: 'Orbitron', sans-serif;
`

export default ChessSocket

