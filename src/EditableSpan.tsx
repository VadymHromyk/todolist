import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  value: string;
  onChange: (newTitle: string) => void;
};

export const EditableSpan = ({ value, onChange }: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(value);

  const turnEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      onChange(title);
    }
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      {isEditMode ? (
        <TextField
          variant={"outlined"}
          value={title}
          size={"small"}
          onChange={changeTitle}
          onBlur={turnEditMode}
          autoFocus
        />
      ) : (
        <span onDoubleClick={turnEditMode}>{value}</span>
      )}
    </>
  );
};
