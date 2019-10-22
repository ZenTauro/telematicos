import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from '../config/colors';
import {  Link as RRLink } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  background-color: ${colors["grey-lighter"]};

  margin: 0 auto;
  padding: 0;
`;

const Links = styled.ul`
  display: flex;
  flex-flow: row wrap;

  margin: auto 0;
  padding: 0;
`;

const Link = styled(RRLink)`
  text-decoration: none;
  padding: 0.5em 1em;
  color: ${colors["brand-light"]}

  :hover {
    background-color: ${colors.brand}
    color: ${colors["brand-lighter"]}
  }
`;

const LiItem = styled.li`
  list-style-type: none;
`;

interface IMenuItemProps {
  link: {
    name: string,
    dir: string,
  }
}

function MenuItem(props: IMenuItemProps): ReactElement {
  return(
    <LiItem>
      <Link to={ props.link.dir }> { props.link.name } </Link>
    </LiItem>
  )
}

interface IMessageProps {
  name: string,
}

const Welcome = styled.p`
  padding: 0.5em 1em;
  margin: 0;
`;

function Message(props: IMessageProps): ReactElement {
  return (
    <Welcome> {`Bienvenido ${props.name}`} </Welcome>
  )
}

export default
class NavBar extends React.Component<{}, {name: string}> {
  constructor(props: {}) {
    super(props);
    const maybeName = localStorage.getItem('name');
    const name = maybeName ? maybeName : 'Anonimo';

    this.state = { name };
  }

  handleStorageUpdate() {
    const maybeName = localStorage.getItem('name');
    const name = maybeName ? maybeName : 'Anonimo';

    this.setState({name})
    console.log('Storage Update')
  }

  componentDidMount() {
    window.addEventListener('onStorageChange', this.handleStorageUpdate);
  }

  render() {
    const links = [
      { name: 'Home',     dir: '/' },
      { name: 'Config',   dir: '/config' },
      { name: 'Personal', dir: '/myspace' },
    ];

    return (
      <Nav>
        <Links>
        {
          links.map(
            link => { return <MenuItem link={link} key={link.name} /> }
          )
        }
        </Links>
        <Message name={this.state.name} />
      </Nav>
    )
  }
}