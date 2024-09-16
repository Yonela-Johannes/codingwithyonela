import React, { useContext, useEffect, useState } from "react";
import { MdAdd, MdOutlineAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NoteCard from "../../components/notes/Cards/NoteCard";
import { Modal } from "antd";
import toast from "react-hot-toast";
import Empty from "../Empty";
import {
  disableNotesUpdates,
  getAllNotes,
  pinNote,
  removeNote,
} from "../../features/notes/notesSlice";
import { Head } from "../../shared/Head";
import { ThemeContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { LayoutContext } from "../../context/LayoutContext";

const Notes = () => {
  const { layout } = useContext(LayoutContext);
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useSelector((state) => state.user);
  const { notes, created, updated, deleted, pinned } = useSelector(
    (state) => state.note
  );
  const [newNotes, setNewNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const updatedNotes = notes.map((note) => ({
      ...note,
      tags: note.tags ? JSON.parse(note.tags) : [],
    }));

    setNewNotes(updatedNotes);
  }, [notes]);

  const dispatch = useDispatch();
  // console.log(filterNotes);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const fetchNotes = () => {
    dispatch(getAllNotes());
    dispatch(disableNotesUpdates());
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (created) {
      toast("Note created succesful");
      fetchNotes();
      setOpenAddEditModal({ isShown: false, type: "add", data: null });
    } else if (updated) {
      toast("Note updated succesful");
      fetchNotes();
      setOpenAddEditModal({ isShown: false, type: "edit", data: null });
    } else if (deleted) {
      toast("Note deleted");
      fetchNotes();
    } else if (pinned) {
      toast("Note pinned");
      fetchNotes();
    }
  }, [created, updated, deleted, pinned]);

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // Delete Note
  const deleteNote = async (data) => {
    const id = data.note_id;
    dispatch(removeNote(id));
  };

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/search", {
        params: { query },
        withCredentials: true,
      });

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      setIsSearch(true);
      setFilterNotes(res.data.notes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const id = noteData.note_id;
    const pin = noteData.is_pinned;
    dispatch(pinNote({ id, pin }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full my-5"
    >
      <div className="flex justify-between items-center">
        <div className="space-y-4 max-w-[550px] mb-8">
          <Head
            title="Notes"
            desc="Organize ideas and project details in one place. Easily create, update, and manage notes to stay focused and on track."
            theme={theme}
          />
        </div>
        {currentUser?.is_admin || currentUser?.is_staff ? (
          <button
            onClick={() => {
              setOpenAddEditModal({ isShown: true, type: "add", data: null });
            }}
            title="Add/Edit Note"
            className={` ${
              theme == "light"
                ? "text-black bg-bg_light"
                : "bg-bg_grey text-bg_lightest"
            } flex p-0 items-center justify-center text-base border-none`}
          >
            <p className="pl-2">Note</p>
            <div
              className={` ${
                theme == "light"
                  ? "text-black bg-bg_light"
                  : "bg-bg_grey text-bg_lightest"
              } flex p-0 items-center justify-center text-lg  w-10 h-10`}
            >
              <MdOutlineAdd size={20} />
            </div>
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="container mx-auto">
        {newNotes?.length ? (
          layout == "grid" ? (
            filterNotes.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
                {newNotes?.map((note) => (
                  <NoteCard
                    key={note.note_id}
                    title={note.title}
                    date={note.createdAt}
                    content={note.content}
                    tags={note.tags}
                    isPinned={note.is_pinned}
                    username={note.username}
                    image={note.profile}
                    theme={theme}
                    onEdit={() => {
                      handleEdit(note);
                    }}
                    onDelete={() => {
                      deleteNote(note);
                    }}
                    onPinNote={() => {
                      updateIsPinned(note);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
                {newNotes?.map((note, index) => (
                  <NoteCard
                    key={note.note_id}
                    title={note.title}
                    date={note.createdAt}
                    content={note.content}
                    tags={note.tags}
                    isPinned={note.is_pinned}
                    username={note.username}
                    image={note.profile}
                    theme={theme}
                    onEdit={() => {
                      handleEdit(note);
                    }}
                    onDelete={() => {
                      deleteNote(note);
                    }}
                    onPinNote={() => {
                      updateIsPinned(note);
                    }}
                  />
                ))}
              </div>
            )
          ) : layout == "grid" ? (
            filterNotes.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
                {newNotes?.map((note, index) => (
                  <NoteCard
                    key={note.note_id}
                    title={note.title}
                    date={note.createdAt}
                    content={note.content}
                    tags={note.tags}
                    isPinned={note.is_pinned}
                    username={note.username}
                    image={note.profile}
                    theme={theme}
                    onEdit={() => {
                      handleEdit(note);
                    }}
                    onDelete={() => {
                      deleteNote(note);
                    }}
                    onPinNote={() => {
                      updateIsPinned(note);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
                {newNotes?.map((note, index) => (
                  <NoteCard
                    key={note.note_id}
                    title={note.title}
                    date={note.createdAt}
                    content={note.content}
                    tags={note.tags}
                    isPinned={note.is_pinned}
                    username={note.username}
                    image={note.profile}
                    theme={theme}
                    onEdit={() => {
                      handleEdit(note);
                    }}
                    onDelete={() => {
                      deleteNote(note);
                    }}
                    onPinNote={() => {
                      updateIsPinned(note);
                    }}
                  />
                ))}
              </div>
            )
          ) : filterNotes.length > 0 ? (
            <div className="flex flex-col gap-4 mt-8 max-md:m-5">
              {newNotes?.map((note, index) => (
                <NoteCard
                  key={note.note_id}
                  title={note.title}
                  date={note.createdAt}
                  content={note.content}
                  tags={note.tags}
                  isPinned={note.is_pinned}
                  username={note.username}
                  image={note.profile}
                  theme={theme}
                  onEdit={() => {
                    handleEdit(note);
                  }}
                  onDelete={() => {
                    deleteNote(note);
                  }}
                  onPinNote={() => {
                    updateIsPinned(note);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-8 max-md:m-5">
              {newNotes?.map((note, index) => (
                <NoteCard
                  key={note.note_id}
                  title={note.title}
                  date={note.createdAt}
                  content={note.content}
                  tags={note.tags}
                  isPinned={note.is_pinned}
                  username={note.username}
                  image={note.profile}
                  theme={theme}
                  onEdit={() => {
                    handleEdit(note);
                  }}
                  onDelete={() => {
                    deleteNote(note);
                  }}
                  onPinNote={() => {
                    updateIsPinned(note);
                  }}
                />
              ))}
            </div>
          )
        ) : (
          <Empty
            title="No notes"
            description="The CodingWithYonela Team has not created a note yet."
            path="/admin/new-blog"
            pathMessage="Create Note"
          />
        )}
      </div>
      <Modal
        onCancel={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        open={openAddEditModal.isShown}
        noteData={openAddEditModal.data}
        width={600}
        footer={false}
        title="Note"
        className="rounded-none"
      >
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </motion.div>
  );
};

export default Notes;
