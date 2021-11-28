import * as express from 'express';
const router = express.Router();
import * as  React from "react";
import { renderToString } from 'react-dom/server';
import { Home } from '../../components/Home';
import { Login } from '../../components/Login';


const loginComponentMarkup: string = renderToString(React.createElement(Login));
const homeComponentMarkup: string = renderToString(React.createElement(Home));

const html = ({ title, body }: { title: string, body: string; }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
    </body>
    <script src="js/client.js" defer></script>
  </html>
`;

router.get('/login', (req, res) => {
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

  return res.send(html({
    title: 'Todo List - Home',
    body: homeComponentMarkup
  }));
});

export default router;