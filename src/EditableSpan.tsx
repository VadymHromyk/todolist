import { ChangeEvent, useState } from "react";

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
        <input
          name={"inputEditableSpan"}
          value={title}
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
