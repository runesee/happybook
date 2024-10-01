import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import deleteBook from "../Database/deleteBook";

function BookViewComponent(props) {
  return (
    //The book popup
    <div className="bookView" justify>
          <h4> {props.tittel}</h4>
          <p style={{marginTop: 0, marginBottom: 5}}> {props.forfatter}</p>
          <Button 
          onClick= {props.onClick}
          variant="outlined"
          sx={{ 
            color: "#976940",
            borderColor: "#976940" }}
          startIcon={<DeleteIcon />}
          >
          Delete
          </Button>
        </div>
  );
}

export default BookViewComponent;