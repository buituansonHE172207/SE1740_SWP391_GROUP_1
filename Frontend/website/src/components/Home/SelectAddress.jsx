import React from 'react'
import { useState } from 'react'
import FormSelect from 'react-bootstrap/esm/FormSelect'
const SelectAddress = ({label, options = null, name, setValue, setName}) => {
    const [optionDisabled, setOptionDisabled] = useState(false);
    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setName(event.target.selectedOptions[0].dataset.name);
        setValue(newValue);
      };
  return (
    <div>
        <FormSelect name={name} onChange={handleSelectChange}>
            <option value=''> {`--${label}--`} </option>
            {
                options?.map(option => {
                    return (
                        <option key={option?.codename} data-name={option.name} value={option.code}>{option?.name}</option>
                    )
                })
            }
        </FormSelect>
    </div>
  )
}

export default SelectAddress