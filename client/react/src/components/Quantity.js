import { useRef } from 'react'
function Quantity (props) {
    

    const onChange = (event) => {
        if (event.target.value > 0){
            console.log(event.target.value);
            props.setQuantity(props.id, event.target.value);
        }
        else if (event.target.value <= 0){
            props.setQuantity(props.id, 1);
            //document.getElementById("quantityInput").value = 1;
            inputRef.current.value = 1;  
        }
        // props.setItem(newItem)
    }

    const inputRef = useRef(null);

    return (
        <div>
            <li><input ref={inputRef} id="quantityInput" className="form-control input-lg" type="number" min="1" value={props.quantity} onChange={onChange}></input></li>
        </div>
    )
}
export default Quantity;