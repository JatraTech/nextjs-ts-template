// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { ColorPicker, Input } from 'antd';

const ColorPickerForm1 = ({ color: parentColor, setColor: setParentColor, defaultColor = '#000000', children = null, trigger = null }) => {
    const [color, setColor] = useState({
        r: 0,
        g: 0,
        b: 0,
        hex: defaultColor,
    });

    // Update the state if the parent color changes
    useEffect(() => {
        if (parentColor) {
            const bigint = parseInt(parentColor.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;

            setColor({ r, g, b, hex: parentColor });
            if (trigger) {
                trigger(parentColor);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentColor]);

    const handleColorChange = (newColor) => {
        const hex = newColor.toHexString();
        const { r, g, b } = newColor.toRgb();

        const updatedColor = {
            r,
            g,
            b,
            hex,
        };

        setColor(updatedColor);
        if (setParentColor) setParentColor(hex); // Notify the parent component
    };

    const handleRGBInputChange = (e) => {
        const { name, value } = e.target;
        const updatedColor = { ...color, [name]: value };

        const rgb = {
            r: Math.min(255, Math.max(0, parseInt(updatedColor.r || 0))),
            g: Math.min(255, Math.max(0, parseInt(updatedColor.g || 0))),
            b: Math.min(255, Math.max(0, parseInt(updatedColor.b || 0))),
        };

        const hex = `#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)}`;

        const finalColor = {
            ...rgb,
            hex,
        };

        setColor(finalColor);
        if (setParentColor) setParentColor(hex);
    };

    const handleHexInputChange = (e) => {
        const { value } = e.target;
        const hex = value.startsWith('#') ? value : `#${value}`;

        if (/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;

            const finalColor = {
                r,
                g,
                b,
                hex,
            };

            setColor(finalColor);
            if (setParentColor) setParentColor(hex);
        } else {
            setColor((prevColor) => ({ ...prevColor, hex: value }));
        }
    };

    const customPanelRender = (_, { components: { Picker, Presets } }) => (
        <div className="flex gap-6 drag-off">
            <Picker />
            <div className="flex flex-col gap-2 w-[120px] justify-between">
                {['r', 'g', 'b'].map((key) => (
                    <div key={key} className="flex items-center gap-2 h-full">
                        <label className="text-lg text-black font-inter">{key.toUpperCase()}</label>
                        <Input
                            name={key}
                            value={color[key]}
                            onChange={handleRGBInputChange}
                            type="number"
                            min="0"
                            max="255"
                            className="h-full !bg-white-100 !border-shark-700 !text-lg"
                        />
                    </div>
                ))}
                <div className="flex items-center gap-2 h-full">
                    <label className="text-lg text-black font-inter">#</label>
                    <Input
                        value={color.hex}
                        onChange={handleHexInputChange}
                        className="h-full !bg-white-100 !border-shark-700 !text-lg"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <ColorPicker
                className='drag-off'
                value={color.hex}
                onChange={handleColorChange}
                styles={{
                    popupOverlayInner: {
                        width: 323,
                    },
                }}
                panelRender={customPanelRender}
            >{children}</ColorPicker>
        </div>
    );
};

export default ColorPickerForm1;

// Example to use

// const [color, setColor] = useState('#3498db');

// <ColorPickerForm1
//     color={color}
//     setColor={setColor}
//     defaultColor="#ff0000" // Optional fallback color
// />