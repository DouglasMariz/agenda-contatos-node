import {createConnection} from 'typeorm';

createConnection().then(() => {
    console.log('Mysql DB Connected');
});
