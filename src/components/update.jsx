import {useParams} from "react-router-dom";


export const Update = () => {
    let {id} = useParams();
    return (
        <div>
            <h1>{id}</h1>
        </div>
    )
}