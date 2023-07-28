/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth';
import { updateUserProfile } from '../utils/data/userData';

function RegisterForm({ user, updateUser }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    profile_image_url: '',
    email: '',
    uid: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: user.id,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        profile_image_url: user.profile_image_url || '',
        email: user.email || '',
        uid: user.uid || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.id) {
      updateUserProfile(formData)
        .then(() => updateUser(user.uid))
        .then(() => router.push('/profile'));
    } else {
      registerUser(formData)
        .then(() => router.push('/'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="first_name"
          required
          value={formData.first_name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="last_name"
          required
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control
          name="profile_image_url"
          required
          value={formData.profile_image_url}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_image_url: PropTypes.string,
  }),
  updateUser: PropTypes.func,
};

export default RegisterForm;
