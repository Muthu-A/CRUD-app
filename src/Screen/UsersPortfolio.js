import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, addUser, updateUser, deleteUser } from "../Redux/action";
import Spinner from "../Components/Spinner";
import { Button } from 'antd';
import "../table.css";
import "bootstrap/dist/css/bootstrap.min.css";

function UsersPortfolio() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        colour: ""
    });
    const [error, setError] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    /**
     * Validating an user data
     */
    const validatePostValue = () => {
        if (!formData.name) {
            return false;
        } else if (!formData.age) {
            return false;
        } else if (!formData.colour) {
            return false;
        } else {
            return true;
        }
    };

    /**
     * Checking the user is already exist or not
     */
    const isUserExist = () => {
        return state?.data && state?.data.length && state?.data?.some(user => user.name === formData.name && user.age === formData.age && user.colour === formData.colour);
    };

    /**
     * Function is for Adding and Updating the user data  
     */
    const addAndUpdateUserInformation = useCallback(() => {
        if (validatePostValue() && !isEdit && !isUserExist()) {
            dispatch(addUser(formData))
            resetState()
        } else if (validatePostValue() && isEdit && !isUserExist()) {
            dispatch(updateUser(selectedUserId, formData))
            resetState()
        } else if (isUserExist()) {
            setError(
                "The user is already exist"
            );
        }
        else {
            setError(
                "There is some missing fields are there please fill the field to submit"
            );
        }
    }, [formData, isEdit, selectedUserId]);

    const resetState = () => {
        setFormData({
            name: "",
            age: "",
            colour: ""
        })
        setIsEdit(false)
        setSelectedUserId('')
        setError('')
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
            {state.loading ? <Spinner /> : (
                <div className="container mt-5">
                    <div className="row">
                        <h1>User Form</h1>
                        <div className="col-md-4">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Age</label>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="colour" className="form-label">Colour</label>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="colour"
                                        name="colour"
                                        value={formData.colour}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                {error && <h5 style={{ color: "red" }}>{error}</h5>}
                                <div style={{ marginTop: '10px' }}>
                                    <Button type="primary" onClick={addAndUpdateUserInformation} loading={state.buttonLoading}>
                                        {isEdit ? 'Update' : 'Add User'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            {state?.data && state?.data?.length > 0 && (
                                <>
                                    <h2>{"Users list"}</h2>

                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th>AGE</th>
                                                <th>COLOUR</th>
                                                <th>Edit</th>
                                                <th>DELETE</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {state?.data &&
                                                state?.data?.length > 0 &&
                                                state?.data?.map((element, index) => (
                                                    <tr key={element.id}>
                                                        <td>{element.name}</td>
                                                        <td>{element.age}</td>
                                                        <td>{element.colour}</td>
                                                        <td
                                                            style={{ cursor: "pointer", color: "blue" }}
                                                            onClick={() => {
                                                                const userInfo = { name: element.name, age: element.age, colour: element.colour }
                                                                setIsEdit(true)
                                                                setSelectedUserId(element._id)
                                                                setFormData(userInfo)
                                                            }}
                                                        >
                                                            {"Edit"}
                                                        </td>

                                                        <td
                                                            style={{ cursor: "pointer", color: "red" }}
                                                            onClick={() => {
                                                                dispatch(deleteUser(element._id))
                                                            }}
                                                        >
                                                            {"Delete"}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default UsersPortfolio;
