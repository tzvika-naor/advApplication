import { useState } from 'react'
function Quantity (props) {
    console.log(props)
    const [index, setIndex] = useState(props.index)
    
    const onChange = (event) => {
        // console.log(event.target.value);
        // console.log(index);
        // const newItem = {
        //     index: index,
        //     quantity: +event.target.value
        // }
        // props.setItem(newItem)
        
        if (event.target.value > 0){
            //props.quantity = +event.target.value;
            console.log(event.target.value);
            props.setQuantity(props.id, event.target.value);
        }
        else if (event.target.value <= 0){
            props.setQuantity(props.id, 1);
            document.getElementById("quantityInput").value = 1;  
        }
    }
    return (
        <div>
            <li><input id="quantityInput" className="form-control input-lg" type="number" min="1" value={props.quantity} onChange={onChange}></input></li>
        </div>
    )
}
export default Quantity;