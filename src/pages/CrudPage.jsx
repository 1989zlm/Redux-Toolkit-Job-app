import { useState } from "react";
import { Button, ButtonGroup, Stack, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "../components/FormModal";
import { deleteTask } from "../redux/slices/crudSlice";

const CrudPage = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((store) => store.counterReducer);
  const crudState = useSelector((store) => store.crudReducer);
  console.log(crudState);

  //modal açıkmı statei
  const [isOpen, setIsOpen] = useState(false);

  //düzenlenecek eleman statei
  const [editItem, setEditItem] = useState(null);

  return (
    <div className="px-3">
      {/* <button className="btn btn-danger d-flex justify-content-end">
        Merhaba
      </button> eski butun */}
      <Stack className="align-items-end my-4">
        <Button onClick={() => setIsOpen(true)}>Add New Task</Button>
      </Stack>

      <Table
        striped
        bordered
        hover
        responsive
        variant={counterState.isDarkTheme ? "dark" : "light"}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Writer</th>
            <th>Assign</th>
            <th>Date</th>
            <th>Process</th>
          </tr>
        </thead>
        <tbody>
          {crudState.tasks.map((task, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{task.title}</td>
              <td>{task.author}</td>
              <td>{task.assigned_to}</td>
              <td>{task.end_date}</td>
              <td>
                <ButtonGroup size="sm">
                  <Button
                    onClick={() => dispatch(deleteTask(task.id))}
                    variant="danger"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      setEditItem(task);
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/*Form Modal  bu modali hem düzenleme modali, hem açıkmı kapalımı hemde görev ekleme modali olarak kullanacağımız için form modala bu değerlerin hepsini prop olarak gönderiyoruz.*/}
      <FormModal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
          setEditItem(null);
        }}
        editItem={editItem}
      />
    </div>
  );
};

export default CrudPage;

//* UYARILAR */

//! bu sayfa ve crud uygulamasında react-bootstrap kütüphanesinden faydalandık o yuzden butunlar staxk gibi yeni isimler olabilir

//? flex = Stack
//? grid = row
//? clasname = variant diyoruz bu kğtğphanenın özelliğidir.
