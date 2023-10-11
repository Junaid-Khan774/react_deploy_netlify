import React from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from './hooks/useWindowSize';
import {FaLaptop, FaTabletAlt, FaMobileAlt} from 'react-icons/fa';
const Header = ({title}) => {
  const {width} = useWindowSize();
  return (
    <header style={{backgroundColor: 'aqua'}}>
        <h1>{title}</h1>
        {width < 768 ? <FaMobileAlt />
        : width < 992 ? <FaTabletAlt />
        : <FaLaptop />
        
      }
    </header>
    
  )
}

export default Header;