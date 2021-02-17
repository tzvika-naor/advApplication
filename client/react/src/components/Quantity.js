import { useState } from 'react'
function Quantity (props) {
    console.log(props)
    const [index, setIndex] = useState(props.index)

    const onChange = (event) => {
        console.log(event.target.value);
        console.log(index);
        const newItem = {
            index: index,
            value: +event.target.value
        }
        props.setItem(newItem)
    }
    return (
        <div>
            <li><input className="form-control input-lg" type="number" defaultValue={props.value} onChange={onChange}></input></li>
        </div>
    )
}
export default Quantity;