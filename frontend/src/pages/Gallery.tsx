import React  from 'react';
import Images from '../components/Images';
import styled from 'styled-components';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { colors } from '../config/colors';

const image1 = require('../assets/gallery/image1.jpg');
const pizzaguy = require('../assets/gallery/pizzaguy.jpg');
const worker = require('../assets/gallery/worker.jpg');
const pizzagirl = require('../assets/gallery/pizzagirl.jpg');
const ambulance = require('../assets/gallery/ambulance.jpg');
const image6 = require('../assets/gallery/image6.jpg');

const ImageContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
`;

const GalleryViewer = styled.div`
    margin: 2em 6em;
`;

const RenderedImage = styled.img`
    max-width: 20em;
`;

const RenderContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Btn = styled.button`
    background-color: ${colors["brand-light"]};
    color: white;
    border: none;
    padding: 2em 1em;
    margin: 2em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
`;

interface IGalleryProps { }
interface IGalleryState {
    index: number;
    which: number;
}

export default
class Gallery extends React.Component<IGalleryProps, IGalleryState> {
    num_imgs = 5;
    imgs = [
        {
            url: image1,
            info: 'Image 1'
        },
        {
            url: pizzaguy,
            info: 'Image 2 - pizza guy'
        },
        {
            url: worker,
            info: 'Image 3 - worker'
        },
        {
            url: pizzagirl,
            info: 'Image 4 - Pizza girl'
        },
        {
            url: ambulance,
            info: 'Image 5 - Ambulance'
        },
        {
            url: image6,
            info: 'Image 6'
        },
    ];

    constructor(props: IGalleryProps) {
        super(props);

        this.state = {
            index: 0,
            which: 0,
        }

        this.handleBackward = this.handleBackward.bind(this);
        this.handleForward = this.handleForward.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleForward(): void {
        if( (this.state.index+1) * this.num_imgs >= this.imgs.length) {
            return;
        }

        this.setState({index: this.state.index + 1, which: 0})
    }

    handleBackward(): void {
        if( this.state.index <= 0 ) {
            return;
        }

        this.setState({index: this.state.index - 1, which: 0})
    }

    handleSelection(which: number) {
        this.setState({which});
    }

    render() {
        const from = this.state.index * this.num_imgs;
        const to = (this.state.index + 1) * this.num_imgs < this.imgs.length ?
            (this.state.index + 1) * this.num_imgs :
            this.imgs.length;

        const to_render = this.imgs.slice(from, to);

        return <GalleryViewer>
            <RenderContainer>
                <Btn onClick={this.handleBackward}><FaArrowLeft /></Btn>
                <RenderedImage src={to_render[this.state.which].url} />
                <Btn onClick={this.handleForward}><FaArrowRight /></Btn>
            </RenderContainer>
            <ImageContainer>
                <Images images={ to_render } clickFn={ this.handleSelection } />
            </ImageContainer>
        </GalleryViewer>
    }
}