import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Input } from '../Input/Input';
import { FormStyled, SubmitButtonStyled } from './ContactForm.styles';

export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleInputValues = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  submitForm = evt => {
    evt.preventDefault();
    this.props.onSubmit({
      id: uuidv4(),
      name: this.state.name,
      number: this.state.number,
    });
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <FormStyled onSubmit={this.submitForm}>
        <Input
          id={uuidv4()}
          type={'text'}
          label={'Name'}
          name={'name'}
          placeholder={'Jason Born'}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={this.state.name}
          onChange={this.handleInputValues}
          title={
            "Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          }
          required={true}
        />

        <Input
          id={uuidv4()}
          type={'tel'}
          label={'Number'}
          name={'number'}
          placeholder={'+44-787-123-45-67'}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          value={this.state.number}
          onChange={this.handleInputValues}
          title={
            'Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +'
          }
          required={true}
        />

        <SubmitButtonStyled type="submit">Add contact</SubmitButtonStyled>
      </FormStyled>
    );
  }
}
