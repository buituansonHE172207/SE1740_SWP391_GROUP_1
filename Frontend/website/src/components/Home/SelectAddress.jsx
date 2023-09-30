import React from 'react'
import { useState } from 'react'
import FormSelect from 'react-bootstrap/esm/FormSelect'
const SelectAddress = ({label, options = null, name, setValue}) => {
    const [optionDisabled, setOptionDisabled] = useState(false);
    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
      };
  return (
    <div>
        <label htmlFor="select-address">{label}</label>
        <FormSelect name={name} onChange={handleSelectChange}>
            <option value=''> {`--Chọn ${label}--`} </option>
            {
                options?.map(option => {
                    return (
                        <option key={option?.codename} value={option.code}>{option?.name}</option>
                    )
                })
            }
        </FormSelect>
    </div>
  )
}

export default SelectAddress