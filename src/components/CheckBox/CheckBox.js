import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({ isChecked, onChange, label, value}) => {

  const [_isChecked, _setIsChecked] = useState(isChecked||false);

  const handleChange = () => {
    _setIsChecked(!_isChecked);
    onChange && onChange(value,!_isChecked);
  };
  return (
    <S.CheckBox>
      <FormControlLabel
        control={<Checkbox checked={_isChecked} onChange={handleChange} color="primary" />}
        label={label}
      />
    </S.CheckBox>
  );
};

export default CheckBox;
