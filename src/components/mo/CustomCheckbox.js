import { useState } from 'react'
import styled from 'styled-components'

const uncheckedSvg = '/img/unCheckBox.svg'
const checkedSvg = '/img/checkBox.svg'

const CustomCheckbox = ({ text, isChecked, onChange }) => {
  const handleChange = () => {
    onChange(!isChecked)
  }

  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <input
        style={{ display: 'none' }}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <img
        src={isChecked ? checkedSvg : uncheckedSvg}
        alt={isChecked ? 'Checked' : 'Unchecked'}
        height={20}
        width={20}
      />
      <div style={{ marginLeft: 6, fontSize: 14, color: '#919191' }}>
        {text}
      </div>
    </label>
  )
}

export default CustomCheckbox
