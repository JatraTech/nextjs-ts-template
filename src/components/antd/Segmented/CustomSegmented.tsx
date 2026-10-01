// @ts-nocheck
import { Segmented } from 'antd';
import React from 'react';

const CustomSegmented = ({
    options,
    onChange,
    defaultValue
}) => {
    return (
        <div className='custom-segmented'>
            <Segmented
                defaultValue={defaultValue}
                options={options}
                onChange={onChange}
            />
        </div>
    );
};

export default CustomSegmented;


{/* <Segmented
    options={options}
    onChange={(value) => {
        console.log(value); // string
    }}
/> */}