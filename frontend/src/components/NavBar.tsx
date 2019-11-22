import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from '../config/colors';
import {  Link as RRLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/Store';

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

const mapStateToProps = (state: IStoreState) => ({ name: state.username });

function Message(props: IMessageProps): ReactElement {
  return (
    <Welcome> {`Bienvenido ${props.name}`} </Welcome>
  )
}

const NavBar: React.FC<{name: string}> = ({name}) => {
  const links = [
    { name: 'Home',     dir: '/' },
    { name: 'Gallery',  dir: '/gallery' },
    { name: 'Tables',   dir: '/tables' },
    { name: 'Config',   dir: '/config' },
    { name: 'Personal', dir: '/myspace' },
  ];

  console.log(name);

  return (
    <Nav>
      <Links>
      {
        links.map(
          link => { return <MenuItem link={link} key={link.name} /> }
        )
      }
      </Links>
      <Message name={ name } />
    </Nav>
  )
}

export default connect(mapStateToProps)(NavBar);