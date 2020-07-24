import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import SaveOptionsForm from "./SaveOptionsForm";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../../actions/layout";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    justifyContent: "center",
  },
}));

function EditorModal({ slateValue, edit, openModal, closeModal, open }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    openModal();
  };

  const handleClose = () => {
    closeModal();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <SaveOptionsForm slateValue={slateValue} edit={edit} />
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Save
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  open: state.layout.editorModal,
});

export default connect(mapStateToProps, { openModal, closeModal })(EditorModal);
