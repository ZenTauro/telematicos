import React  from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

import $ from 'jquery';

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
    tables: {
        name: string,
        temperature: number,
        humidity: number,
        noise: number,
        light_level: number,
        color: string
    }[][],
}

export default
class Tables extends React.Component<ITablesProps, ITablesState> {
    constructor(props: ITablesProps) {
        super(props);

        this.state = {
            selected: 0,
            tables: [
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
        ]
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
        $.getJSON("/api/0.1/")

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
        const pages = this.state.tables.map((_, i) => (
            <button key={i} onClick={() => {this.handleClick(i)}} >
                <span>Pagina {i + 1}</span>
            </button>
        ));

        return <div>
            <Card>{{
                header: "Tabla",
                rest: <>
                    <TableContainer pages={ this.state.tables } selected={ this.state.selected } />
                    <PaginationContainer className='pagination'>
                        { pages }
                    </PaginationContainer>
                </>
            }}</Card>
        </div>
    }
}