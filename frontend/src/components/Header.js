
import React from 'react';

export const Header = (props) => {

    const { title, motto } = props;
    return (
        <header className='bg-danger p-5 text-center'>
            <h1 className='display-2 text-white'>{title}</h1>
            {motto &&
                <small style={{ fontSize: '30px', color: '#aaa', borderTop: '1px solid #aaa', textTransform: 'uppercase' }}>{motto}</small>
            }
        </header>

    );

} 