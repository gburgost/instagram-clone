import React  from 'react';
import { Divider, Form, Button, Icon } from 'semantic-ui-react';


export default ({styles, handleClick}) => {
  return (
    <div>
      <div style={styles.box}>
        <img src='images/logo.png' />
        <h4>
          Regístrate para ver fotos y vídeos de tus amigos.
        </h4>

        <Form>
          <Button color='facebook'>
            <Icon name='facebook' /> Iniciar sesión con facebook
          </Button>
          <Divider horizontal>O</Divider>
          <Form.Field>
            <Form.Input placeholder='email' icon={<Icon name='remove circle' color='red' size='large' />} />
          </Form.Field>
          <Form.Field>
            <Form.Input placeholder='Nombre completo' icon={<Icon name='remove circle' color='red' size='large' />} />
          </Form.Field>
          <Form.Field>
            <Form.Input placeholder='nombre de usuario' icon={<Icon name='remove circle' color='red' size='large' />} />
          </Form.Field>
          <Form.Field>
            <Form.Input type='password' placeholder='Password' icon={<Icon name='remove circle' color='red' size='large' />} />
          </Form.Field>

          <Button type='submit' primary fluid>Registrate</Button>
        </Form>



      </div>
      <div style={styles.box}>
        ¿Ya tienes una cuenta? <a href="" onClick={handleClick}>Iniciar sesion.</a>
      </div>
    </div>

  )
}
