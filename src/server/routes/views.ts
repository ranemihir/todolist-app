import express from 'express';
const router = express.Router();
import React from "react";
import { renderToString } from 'react-dom/server';

const html = ({ body }: { body: string; }) => `
  <!DOCTYPE html>
  <html>
    <head>
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
            body: renderToString(React.createElement())
        }));
    }

    return res.redirect('/');
});

router.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }

    return res.send(html({
        body: renderToString(React.createElement())
    }));
});

export default router;