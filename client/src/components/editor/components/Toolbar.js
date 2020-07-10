import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BlockButton from "./BlockButton";
import MarkButton from "./MarkButton";
import {
  InsertTableButton,
  DeleteTableButton,
  InsertColumnButton,
  DeleteColumnButton,
  InsertRowButton,
  DeleteRowButton,
} from "../withTables/Components";
import SaveOptionsModal from "./SaveOptionsModal";
import LinkButton from "../withLinks/components/LinkButton";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import LooksOneIcon from "@material-ui/icons/LooksOne";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "-webkit-sticky",
    position: "sticky",
    top: 0,
    background: "#d1d1cb",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
  },
  toolbar: {
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
  },
}));

const Toolbar = ({ slateValue, edit }) => {
  const classes = useStyles();
  const [formValue, setFormValue] = useState({
    title: "",
    index: 0,
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = null;

  return (
    <div className={classes.root}>
      <div className={classes.buttonGroup}>
        <MarkButton format="bold">
          <FormatBoldIcon />
        </MarkButton>
        <MarkButton format="italic">
          <FormatItalicIcon />
        </MarkButton>
        <MarkButton format="underline">
          <FormatUnderlinedIcon />
        </MarkButton>
        <BlockButton format="heading-one">
          <LooksOneIcon />
        </BlockButton>
        <BlockButton format="heading-two">
          <LooksTwoIcon />
        </BlockButton>
        <BlockButton format="block-quote">
          <FormatQuoteIcon />
        </BlockButton>
        <BlockButton format="numbered-list">
          <FormatListNumberedIcon />
        </BlockButton>
        <BlockButton format="bulleted-list">
          <FormatListBulletedIcon />
        </BlockButton>
        <LinkButton />
        <InsertTableButton />
        <DeleteTableButton />
        <InsertRowButton />
        <InsertColumnButton />
        <DeleteRowButton />
        <DeleteColumnButton />
      </div>
      <div className={classes.toolbar}>
        <SaveOptionsModal slateValue={slateValue} edit={edit} />
      </div>
    </div>
  );
};

export default Toolbar;
