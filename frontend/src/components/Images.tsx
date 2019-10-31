import React from 'react';
import styled from 'styled-components';

const imcss = require('./Images.css');

type ClickFn = (n: number) => void;

interface IImageInfo {
    url: string,
    info: string,
}

interface IImageProps {
    images: IImageInfo[],
    clickFn: ClickFn,
}

const Img = styled.img`
    max-width: 10em;
    height: auto;
`;

export default
/**
 * @param props.images a list of urls to render
 * @param props.clickFn The function used to render the
 *  selected image
*/
function Images(props: IImageProps) {
    const images = props.images.map((val, idx) => (
        <div className="tooltip">
            <Img src={val.url} key={idx} onClick={() => {
                props.clickFn(idx);
            }} />
            <div className="tooltiptext">{val.info}</div>
        </div>
    ));

    return <>
        { images }
    </>
}
