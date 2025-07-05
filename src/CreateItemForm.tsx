import { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";

type Props = {
  onCreateItem: (title: string) => void;
};

export const CreateItemForm = ({ onCreateItem }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    error && setError(null);
  };

  const createItemHandler = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle !== "") {
      onCreateItem(trimmedTitle);
    } else {
      setError("Title is required");
    }
    setTitle("");
  };

  const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && createItemHandler();
  };

  const isButtonDisabled = !title || title.length >= 20;

  return (
    <div>
      <TextField
        label={error ? error : "type smth..."}
        variant={"outlined"}
        size={"small"}
        error={!!error}
        value={title}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <IconButton
        color={"primary"}
        onClick={createItemHandler}
        disabled={isButtonDisabled}
      >
        <AddBoxIcon />
      </IconButton>
    </div>
  );
};
