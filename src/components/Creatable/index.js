import React, { useCallback, useState } from 'react';

import CreatableSelect from 'react-select/creatable';

const CreatableEditableSelect = ({ name, placeHolder, options, value: propValue, onChange, className, placeholderClassName }) => {
    const [editingValue, setEditingValue] = useState();

    const handleChange = useCallback(
        (newValue) => {
            onChange(newValue);
        },
        [onChange],
    );

    const handleEditChange = useCallback(
        (inputValue, data) => {
            const idx = propValue.findIndex((v) => v.value === data.value);
            const newValue = [...propValue];

            if (inputValue.length === 0) {
                newValue.splice(idx, 1);
            } else {
                newValue[idx] = {
                    label: inputValue,
                    value: inputValue,
                };
            }
            onChange(newValue);
            setEditingValue(undefined);
        },
        [propValue, onChange],
    );

    const MultiValueLabel = useCallback(
        ({ data }) => {
            if (editingValue && editingValue === data.value) {
                return (
                    <input
                        type="text"
                        defaultValue={data.value}
                        onKeyDown={(ev) => {
                            ev.stopPropagation();
                            if (ev.key === 'Enter') {
                                handleEditChange(ev.currentTarget.value, data);
                            }
                        }}
                        onBlur={(ev) => {
                            handleEditChange(ev.currentTarget.value, data);
                        }}
                        autoFocus
                    />
                );
            }
            return (
                <button
                    onClick={() => {
                        setEditingValue(data.value);
                    }}>
                    {data.value}
                </button>
            );
        },
        [handleEditChange, editingValue],
    );

    return (
        <CreatableSelect
            name = {name}
            placeholder={placeHolder}
            className = {className}
            isMulti
            placeholderClassName={placeholderClassName}
            value={propValue}
            onChange={handleChange}
            options={options}
            components={{
                MultiValueLabel,
            }}
        />
    );
};

export { CreatableEditableSelect } ;
