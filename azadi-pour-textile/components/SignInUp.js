import {useState} from 'react';
import {Formik, Form, Field} from 'formik';

import Input from "../components/Input";
import parseError from "../utils/parseError";
import '../styles/components/signInUp.css';

const initialValues = {
    email: '',
    password: ''
};

const SignInUp = ({onSubmit, isSignIn}) => {
    const [error, setError] = useState('');

    const validator = ({password, email}) => {
        const errors = {};

        if (password.length === 0) {
            errors.password = 'رمز عبور لازم هست.';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/.test(password)) {
            errors.password = 'رمز عبور معتبر نیست.';
        }

        if (email.length === 0) {
            errors.email = 'پست الکترونیک لازم هست.';
        } else if (!/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(email)) {
            errors.email = 'پست الکترونیک معتبر نیست.';
        }

        return errors;
    };

    return (
        <Formik initialValues={initialValues} onSubmit={(...args) => onSubmit(...args, setError)}
                validate={validator}>
            {({
                  isSubmitting,
                  handleSubmit
              }) => (
                <Form onSubmit={handleSubmit} className="sign-in-container">
                    <img src="media/profile-avatar.svg" className="sign-in-avatar"/>
                    <Field type="email" name="email" component={Input} label="پست الکترونیک" icon="envelope" details={{
                        title: 'پست الکترونیک',
                        description: 'پست الکترونیک معتبر خود را وارد کنید.'
                    }}/>
                    <Field type="password" name="password" component={Input} label="رمز عبور" icon="lock" details={{
                        title: 'رمز عبور',
                        description: 'رمز عبور شما باید شامل حروف بزرک و کوچک انگلیسی، حداقل یک عدد و حداقل یک حرف خاص باشد.'
                    }}/>
                    <div className="sign-in-error" style={{...(error ? {} : {opacity: 0})}}>
                        {error ? parseError(error) : 'A'}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="sign-in-submit">
                        {
                            isSignIn ?
                                'ورود' :
                                'ثبت نام'
                        }
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default SignInUp;