import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { cap1, zip } from '../utils/funcs';

const DataList = styled.ul`
    margin: 0;
    padding: 0;
`;

const DataElement = styled.ul`
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style-type: none;
`;

interface IRoomState {
    country: string;
    city: string;
    localization: string;
    link: string;
    image: string;
}

interface IRoomProps {
    roomName?: string;
}

export default
class Main extends React.Component<IRoomProps, IRoomState> {
    constructor(props: {roomName: ''}) {
        super(props);

        // const ids = [
        //     'country',
        //     'password',
        //     'city',
        //     'coords',
        //     'link',
        //     'isTempActive',
        //     'isHumidityActive',
        //     'isSoundActive',
        //     'isLightActive',
        //     'isMovementActive',
        //     'maxTemp',
        //     'minTemp',
        // ];

        const ctr = localStorage.getItem('country');
        const country = ((ctr === null) || (ctr == '')) ? 
            "Espanna" :
            ctr as unknown as string;

        const cty = localStorage.getItem('city');
        const city = (cty === null || cty == '') ?
            "Alcala de Henares" :
            cty as unknown as string;

        const lcl = localStorage.getItem('coords');
        const localization = (lcl === null || lcl == '') ?
            "41.51, -3.34" :
            lcl as unknown as string;

        const lnk = localStorage.getItem('link');
        const link = (lnk === null || lnk == '') ?
            "maps.google.com" :
            lnk as unknown as string;

        const image = "https://d2felfhvpayf79.cloudfront.net/media/images/properties/singapore/singapore/mandarin-orchard-singapore/rooms-and-suites/premier-room/mos_2013_maintowerpremierroom_twinbed_501_1200x800.jpg";

        this.state = { country, city, localization, link, image }
    }

    render() {
        const room = this.state;
        const list = zip(Object.keys(room), Object.values(room))
                        .filter((val, _,) => (val[0] != 'image'))
                        .map((val, _) => ( <DataElement key={val[0]}> {cap1(val[0])}: { val[1] } </DataElement>));
        return (
            <Card>{{
                header: "Datos de la Habitacion",
                image: this.state.image,
                rest: 
                    <DataList>
                        { list }
                    </DataList>
            }}</Card>
        )
    }
}