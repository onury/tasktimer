'use strict';

const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../../lib')));
app.listen(5001);