import { useMemo, useState } from "react"
import
{
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import styles from "./NoteList.module.css"

function NoteList()
{
  const [selectedTags, setSelectedTags] = useState([{
    id: 1,
    label: "Create blah blah blah with blah",
  },
  {
    id: 1,
    label: "Create blah blah blah with blah",
  },
  {
    id: 1,
    label: "Create blah blah blah with blah",
  },
  {
    id: 1,
    label: "Create blah blah blah with blah",
  },
  {
    id: 1,
    label: "Create blah blah blah with blah",
  },
  {
    id: 1,
    label: "Create blah blah blah with blah",
  },
  {
    id: 1,
    label: "Create blah blah blah with blah",
  },
  {
    id: 1,
    label: "Create blah blah blah with blah",
  },
  {
    id: 1,
    label: "Create blah blah blah with blah",
  },])
  const [title, setTitle] = useState("TAGS")
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)
  const [tags, setTags] = useState([
    {
      id: 1,
      label: "Create blah blah blah with blah",
    },
    {
      id: 1,
      label: "Create blah blah blah with blah",
    },
    {
      id: 1,
      label: "Create blah blah blah with blah",
    },
    {
      id: 1,
      label: "Create blah blah blah with blah",
    },
    {
      id: 1,
      label: "Create blah blah blah with blah",
    },
    {
      id: 1,
      label: "Create blah blah blah with blah",
    },
    {
      id: 1,
      label: "Create blah blah blah with blah",
    },
    {
      id: 1,
      label: "Create blah blah blah with blah",
    },
    {
      id: 1,
      label: "Create blah blah blah with blah",
    },
  ])


  function updateTag(id, label)
  {
    setTags(prevTags =>
    {
      return prevTags.map(tag =>
      {
        if (tag.id === id)
        {
          return { ...tag, label }
        } else
        {
          return tag
        }
      })
    })
  }

  function deleteTag(id)
  {
    setTags(prevTags =>
    {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-secondary"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags?.map(tag =>
                {
                  return { label: tag.label, value: tag.id }
                })}
                options={tags?.map(tag =>
                {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={tags =>
                {
                  setSelectedTags(
                    tags?.map(tag =>
                    {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <EditTagsModal
        updateTag={updateTag}
        deleteTag={deleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        tags={tags}
      />
    </>
  )
}

export default NoteList

function NoteCard({ id, title, tags })
{
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags?.map(tag => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}

function EditTagsModal({
  tags,
  handleClose,
  show,
  deleteTag,
  updateTag,
})
{
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {tags?.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={e => updateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => deleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
