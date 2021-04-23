import { useState } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    return [
        values,
        (e) => setValues({...values, [e.target.name]: e.target.value}),
        (s) => setValues(s)
    ]
};

export default useForm;