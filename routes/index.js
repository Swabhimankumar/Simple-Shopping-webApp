var express = require('express');
var router = express.Router();
var Product=require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  
  /*var products=[
    new Product({
        title: 'redmi note 8',
        imagepath: 'https://img.gkbcdn.com/s3/p/2019-08-30/xiaomi-redmi-note-8-6-3-inch-6gb-128gb-smartphone-black-1574132343289.jpg',
        price:10000
    }),
    new Product({
        title: 'one plus 7 pro',
        imagepath: 'https://images-na.ssl-images-amazon.com/images/I/51s0Mb5li8L._SX569_.jpg',
        price:44000
    }),
    new Product({
        title: 'iphone 11 pro',
        imagepath: 'https://images-na.ssl-images-amazon.com/images/I/61m6DjujESL._SL1024_.jpg',
        price:130000
    }),
    new Product({
        title: 'vivo v17 pro',
        imagepath: 'https://www.ispyprice.com/static/nwprd_model/vivo-v17-pro-9176.jpg',
        price:26000
    }),
    new Product({
        title: 'poco f1',
        imagepath: 'https://5.imimg.com/data5/QX/XK/NO/SELLER-41220934/mi-poco-f1-8gb-plus-256gb-steel-blue-phones-500x500.jpg',
        price:15000
    }),
    new Product({
        title: 'samsung galaxy note 10',
        imagepath: 'https://images-na.ssl-images-amazon.com/images/I/71znGoLL%2B4L._SL1500_.jpg',
        price:68000
    }),
    new Product({
        title: 'redmi k20',
        imagepath: 'https://img.gkbcdn.com/s3/p/2019-05-29/xiaomi-redmi-k20-pro-6-39-inch-8gb-256gb-smartphone-blue-1571990717050.jpg',
        price:25000
    }),
    new Product({
        title: 'oppo reno 2',
        imagepath: 'https://cf.shopee.co.id/file/d832a21155e41088ddd5e4146fb12e0f',
        price:30000
    })
]
var f=0;
for(var i=0;i<products.length;i++){
  
    products[i].save().then(
    f=1)
}
*/


var products1= Product.find((req1,docs)=>{
  var productschunks=[];
  var chunkSize=6;
  for(var i=0;i<docs.length;i+=chunkSize){
    productschunks.push(docs.slice(i,i+chunkSize));
  }
  res.render('index', { title: 'Shopping Cart',products:productschunks });
  //console.log(productschunks);
});
 
});


module.exports = router;
