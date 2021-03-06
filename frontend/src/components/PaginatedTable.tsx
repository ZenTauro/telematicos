import React from 'react';

interface City {
    name:        string,
    temperature: number,
    humidity:    number,
    noise:       number,
    light_level: number,
    color:       string,
}

interface ITableProps {
    pages: City[][],
    selected: number,
}

export default
function TableContainer(props: ITableProps) {
    const selection = props.pages[props.selected].map((val, idx) => (
        <tr className={idx % 2 === 0 ? 'odd-row' : 'even-row'} key={ val.name }>
            <td>{ val.name }</td>
            <td>{ val.temperature }</td>
            <td>{ val.humidity }</td>
            <td>{ val.noise }</td>
            <td>{ val.light_level }</td>
            <td>{ val.color }</td>
        </tr>
    ));

    return(
        <table>
            <thead>
                <tr>
                    <td>Ciudad</td>
                    <td>Temperatura</td>
                    <td>Humedad</td>
                    <td>Ruido</td>
                    <td>Nivel de Luz</td>
                    <td>Color de Iluminacion</td>
                </tr>
            </thead>
            <tbody>
                { selection }
            </tbody>
        </table>
    )
}