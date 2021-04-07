const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3010;
const cors = require('cors');

//Настройка соединения с БД
const connection = mysql.createPool({
   host     : 'remotemysql.com',
   user     : 'VJT3wmdBON',
   port: 3306,
   password : 'yF9iYbJuuO',
   database: 'VJT3wmdBON'
});

app.use(bodyParser.json()); //добавляем код до наших маршрутов
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.send('Home page');
});

app.get('/goods', (req,res) => {
    connection.query(`
    SELECT 
    goods.id,  
    goods.name,
    goods.label,
    goods.description,
    goods.price,
    goods.categories_id, 
    categories.category,
    goods.genders_id,
    genders.gender,
    goods.images_id,
    images.src,
    images.type
FROM 
    goods 
JOIN
    categories
ON
    goods.categories_id = categories.id
JOIN
    genders
ON
    goods.genders_id = genders.id
JOIN 
    images
ON 
    goods.images_id = images.id`, (err, rows) => {

        if(err) throw new err;

        const data = rows;
        const result = data.map(item => {
           return {
               id: item.id,
               name: item.name,
               label: item.label,
               description: item.description,
               price: item.price,
               category: item.category,
               gender: item.gender,
               src: item.src,
               type: item.type
           };
        });
        res.send(result);
    });
});


app.post('/orders', (req,res) => {

    //Товары заказанные пользователем
    const data = req.body.res;
    const date = new Date();


    const addZero = num => {
        if(num >= 0 && num <= 9){
            return '0' + num;
        }else{
            return num;
        }
    };

    //Преобразование формата даты
    const dateDataBase = `${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;

    //Данные о покупателе
    const customer = {
        customer: req.body.name,
        phone: req.body.phone
    };

    //Вставка пользователя в таблицу customers
    connection.query('INSERT INTO customers SET ?', [customer], (err, rows) => {
        if (err) throw new Error;
        //Поиск id последнего добавленного пользователя
        connection.query('SELECT MAX(id) FROM customers',  (err, rows2) => {
            if (err) throw new Error;
           const lastIndex = rows2[0]['MAX(id)'];

           //Формирование результата для вставки в orders
            const result = data.map(item => {
                return {
                    customer_id: lastIndex,
                    goods_id: item.id,
                    count: item.count,
                    datetime: dateDataBase.toString()
                };
            });

            //console.log(lastIndex);
            //console.log(result);

            for(let i = 0; i < result.length; i++){
                //Добавляем заказ пользователя в таблицу orders
                connection.query('INSERT INTO orders SET ?', [result[i]], (err, rows3) => {
                    if (err) throw new Error;
                });
            }
        });
    });

    res.send('Спасибо скоро мы с Вами свяжемся!');
});

//404
app.use((req,res,next) => {
    res.status(404).send('Error 404!');
});

app.listen(PORT, () => {
    console.log(`Порт запущен по адрессу: ${PORT}`);
});
