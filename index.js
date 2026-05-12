require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const HUBSPOT_API_KEY = process.env.PRIVATE_APP_ACCESS_TOKEN;
const CUSTOM_OBJECT_TYPE = process.env.CUSTOM_OBJECT_TYPE; 

const BASE_URL = 'https://api.hubapi.com';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`,
      {
        params: {
          properties: 'name,species,age',
          limit: 100,
        },
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const records = response.data.results;

    res.render('homepage', {
      title: 'Custom Objects | Integrating With HubSpot I Practicum',
      records: records,
    });
  } catch (error) {
    console.error('Error fetching custom objects:', error.response?.data || error.message);
    res.status(500).send('Error fetching data from HubSpot');
  }
});


app.get('/update-cobj', (req, res) => {
  res.render('updates', {
    title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
  });
});


app.post('/update-cobj', async (req, res) => {
  try {
    const { name, species, age } = req.body;

    const payload = {
      properties: {
        name: name,
        species: species,
        age: age,
      },
    };

    await axios.post(
      `${BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.redirect('/');
  } catch (error) {
    console.error('Error creating custom object:', error.response?.data || error.message);
    res.status(500).send('Error creating record in HubSpot');
  }
});


app.listen(3000, () => {
  console.log('App is running at http://localhost:3000');
});
