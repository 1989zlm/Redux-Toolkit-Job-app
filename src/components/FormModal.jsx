import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/slices/crudSlice";

const FormModal = ({ isOpen, handleClose, editItem }) => {
  const dispatch = useDispatch();

  console.log(editItem);

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(e);
    //bütün inputlardaki değerlerden bir nesne oluştur.(formdata clasından örnek oluştur)
    const formData = new FormData(e.target);
    console.log(formData);

    //formdaki inputlardan verisini objeye ceviriyoruz
    const taskData = Object.fromEntries(formData.entries());
    console.log(taskData);

    //bu işlemi yapıyoruz çunku düzenle dediğimizde eski eleman düzenlenmesi yerine hem eskisi duruyor hemde düzenlediğimiz eleman yeniden ekleniyor
    if (editItem) {
      //güncellenicek eleman varsa elemanın güncelleneceğini haber ver
      dispatch(editTask({ id: editItem.id, ...taskData }));
    } else {
      //yoksa reducar'a veri ekleniceğini haber ver
      dispatch(addTask(taskData));
    }
    // modalı kapat
    handleClose();
  };

  return (
    <Modal centered show={isOpen} onHide={handleClose} className="text-black">
      <Modal.Header closeButton>
        <Modal.Title>
          {/* !buurada modali edit ve yeni ekleme için yazıp crudpage da ise form
          !modale aık ve kapalı olarak belirttik */}

          {editItem ? "Update the Task" : "Add New Task"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-4 ">
          <Form.Group>
            <Form.Label>Job Description</Form.Label>
            <Form.Control
              defaultValue={editItem?.title}
              name="title"
              placeholder="Edit Navbar"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              defaultValue={editItem?.author}
              name="author"
              placeholder="ör:Ahmet"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Assigned</Form.Label>
            <Form.Control
              defaultValue={editItem?.assigned_to}
              name="assigned_to"
              placeholder="ör:Mehmet"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              defaultValue={editItem?.end_date}
              name="end_date"
              type="date"
              required
            ></Form.Control>
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              {editItem ? "Save" : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;

//! formData.enteries() ayrı ayrı olan objeleri birleştirip dizi yapar..js te ve reactte var.
