import { useContext } from "react";

export default cartContext = useContext({
    smartphonesInCart: [],
    addToCart: (smartphone) => {},
    removeFromCart: (id) => {}
});