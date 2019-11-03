import React  from 'react';
import Images from '../components/Images';
import styled from 'styled-components';
import Card from '../components/Card';

import $ from 'jquery';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { colors } from '../config/colors';
import TableContainer from '../components/PaginatedTable';

const PaginationContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`;

interface ITablesProps { }

interface ITablesState { 
    selected: number,
}

export default
class Tables extends React.Component<ITablesProps, ITablesState> {
    constructor(props: ITablesProps) {
        super(props);

        this.state = {
            selected: 0,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(num: number) {
        console.log(`Selected page ${num}`);
        this.setState({
            selected: num,
        });
    }

    componentDidMount() {
        $('.even-row')
            .css('background-color', colors["brand-lighter"]);
        $('.odd-row')
            .css('background-color', colors["grey-dark"]);
    }

    componentDidUpdate() {
        $('.even-row')
            .css('background-color', colors["brand-lighter"]);
        $('.odd-row')
            .css('background-color', colors["grey-dark"]);
    }

    render() {
        const tables = [
            [
                { name: "Alcalá", temperature: 25, humidity: 48, noise: 150, light_level: 120, color: '#000000' },
                { name: "Alicante", temperature: 30, humidity: 69, noise: 180, light_level: 211, color: '#FF0000' },
                { name: "Badajoz", temperature: 20, humidity: 40, noise: 50, light_level: 150, color: '#00FF00' },
                { name: "Burgos", temperature: 18, humidity: 42, noise: 211, light_level: 180, color: '#0000FF' },
                { name: "Córdoba", temperature: 35, humidity: 41, noise: 150, light_level: 50, color: '#FFFFFF' },
            ],
            [
                { name: "Alicante", temperature: 30, humidity: 69, noise: 180, light_level: 211, color: '#FF0000' },
                { name: "Badajoz", temperature: 20, humidity: 40, noise: 50, light_level: 150, color: '#00FF00' },
                { name: "Burgos", temperature: 18, humidity: 42, noise: 211, light_level: 180, color: '#0000FF' },
                { name: "Córdoba", temperature: 35, humidity: 41, noise: 150, light_level: 50, color: '#FFFFFF' },
            ],
            [
                { name: "Burgos", temperature: 18, humidity: 42, noise: 211, light_level: 180, color: '#0000FF' },
                { name: "Córdoba", temperature: 35, humidity: 41, noise: 150, light_level: 50, color: '#FFFFFF' },
            ],
            [
                { name: "Córdoba", temperature: 35, humidity: 41, noise: 150, light_level: 50, color: '#FFFFFF' },
            ],
        ];

        const pages = tables.map((_, i) => (
            <button key={i} onClick={() => {this.handleClick(i)}} >
                <span>Pagina {i + 1}</span>
            </button>
        ));

        return <div>
            <Card>{{
                header: <h1>Tabla</h1>,
                rest: <>
                    <TableContainer pages={ tables } selected={ this.state.selected } />
                    <PaginationContainer className='pagination'>
                        { pages }
                    </PaginationContainer>
                </>
            }}</Card>
        </div>
    }
}