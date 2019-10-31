import React  from 'react';
import Images from '../components/Images';
import styled from 'styled-components';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { colors } from '../config/colors';
import TableContainer from '../components/PaginatedTable';

interface ITablesProps { }

interface ITablesState { }

export default
class Tables extends React.Component<ITablesProps, ITablesState> {
    render() {
        const tables = [
            [
                { name: "Alcalá", temperature: 25, humidity: 48, noise: 150, light_level: 120, color: '#000000' },
                { name: "Alicante", temperature: 30, humidity: 69, noise: 180, light_level: 211, color: '#FF0000' },
                { name: "Badajoz", temperature: 20, humidity: 40, noise: 50, light_level: 150, color: '#00FF00' },
                { name: "Burgos", temperature: 18, humidity: 42, noise: 211, light_level: 180, color: '#0000FF' },
                { name: "Córdoba", temperature: 35, humidity: 41, noise: 150, light_level: 50, color: '#FFFFFF' },
            ]
        ]
        return <TableContainer pages={ tables } />
    }
}