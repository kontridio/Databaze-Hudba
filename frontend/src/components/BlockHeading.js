import React from 'react';

export const BlockHeading = (props) => {
    return (
        <h2 className='block-heading p-2 text-center text-white mt-2'>{props.title}</h2>
    );
}