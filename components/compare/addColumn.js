"use client";
import React, { useState } from "react";
import ReactModal from "react-modal";

import classes from "./addColumn.module.css";
import AppBox from "../appBuilders/appBox";

const customStyles = {
  content: {
    top: "10%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translateX(-50%)",
    width: "70%",
    height: "85%",
    overflowY: "scroll",
  },
};

ReactModal.setAppElement("#root");

const AddCompareColumn = ({ appBuilders }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className={classes["choose-column"]}>
      <div className={classes["choose-column__box"]}>
        <div className={classes["choose-column__icon"]} onClick={openModal}>
          +
        </div>
        <p className={classes["choose-column__text"]}>
          Choose A Platform To Compare
        </p>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Choose App Builder Modal"
      >
        <h3 className={classes["modal-title"]}>Choose a platform to compare</h3>
        <section className={classes["app-list-section"]}>
          {appBuilders?.map(({ node }) => (
            <AppBox
              key={node.id}
              slug={node.slug}
              title={node.title}
              featuredImg={node.featuredImage}
              excerpt={node.excerpt}
              isForAdd={true}
            />
          ))}
        </section>
      </ReactModal>
    </div>
  );
};

export default AddCompareColumn;
