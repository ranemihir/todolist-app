import * as express from 'express';
const router = express.Router();
import * as  React from "react";
import { renderToString } from 'react-dom/server';
import { Home } from '../../components/Home';
import { Login } from '../../components/Login';
import { User } from '../../types';


const loginComponentMarkup: string = renderToString(React.createElement(Login));

const html = ({ title, body }: { title: string, body: string; }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">
      <title>${title}</title>
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
    </body>
    <script src="js/client.js" defer></script>
  </html>
`;

router.get('/login', (req, res) => {
  console.log('req.user =>', req.user);

  if (!req.user) {
    return res.send(html({
      title: 'Todo List - Login',
      body: loginComponentMarkup
    }));
  }

  return res.redirect('/');
});

router.get('/', (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  const currentUser = req.user as User;

  const homeComponentMarkup: string = renderToString(React.createElement(
    Home,
    { currentUser }
  ));

  return res.send(html({
    title: 'Todo List - Home',
    body: homeComponentMarkup
  }));
});

export default router;