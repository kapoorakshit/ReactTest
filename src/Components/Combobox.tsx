import * as React from "react";
import {
  Combobox,
  makeStyles,
  Option,
  shorthands,
  useId,
} from "@fluentui/react-components";
import type { ComboboxProps } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    ...shorthands.gap("2px"),
    maxWidth: "400px",
  },
});

export const MultiselectWithValueString = () => {

  const comboId = useId("combo-multi");
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [value, setValue] = React.useState("");
  const options = ["Cat", "Dog", "Ferret", "Fish", "Hamster", "Snake"];
  const styles = useStyles();

  const onSelect: ComboboxProps["onOptionSelect"] = (event, data) => {
  
    setSelectedOptions(data.selectedOptions);

  
    setValue("");
  };

  // clear value on focus
  const onFocus = () => {
    setValue("");
  };

  // update value to selected options on blur
  const onBlur = () => {
    setValue(selectedOptions.join(", "));
  };

  // update value on input change
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    
  };

  return (
    <div className={styles.root}>
      <label id={comboId}>Best pets</label>
      <Combobox
        aria-labelledby={comboId}
        multiselect={true}
        placeholder="Select one or more animals"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onOptionSelect={onSelect}
      
      >
        {options.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </div>
  );
};
