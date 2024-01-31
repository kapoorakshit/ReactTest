import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css'; 
export const Login: React.FC = () => {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
          
            try {
                const response = await axios.post('https://dummyjson.com/auth/login', {
                    username: values.username,
                    password: values.password,
                });

                if (response.status === 200) {
                    const data = response.data;
                    const token=data.token;
                    localStorage.setItem("token",token);
                    navigate("/Navigation");
                }
            } catch (error) {

               console.log(error);
            }
        },
    });
    return (
        <>
        <div className='login-container'>
        <form onSubmit={formik.handleSubmit}>
        <div className="username">
          <label>
             Username
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.username && formik.errors.username && (
            <div className="error-message">{formik.errors.username}</div>
          )}
        </div>
        <div className="password">
          <label>
          Password
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>
        <div>
          <button type="submit" className='button'>Login</button>
        </div>
        </form>
        </div>
        </>
    );
   



}