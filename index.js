//var stripe = require('stripe')('pk_test_bHeOJByUPvMgiWiJ0554Vy6D');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
router.get('/',function(request,response){
    response.send({ success: true });
})
router.post('/processpay', function (request, response) {
    var stripetoken = request.body.stripetoken;
    var amountpayable = request.body.amount;
    var charge = stripe.charge.create({
        amount: amountpayable,
        currency: 'usd',
        description: 'Sample transaction',
        source: stripetoken
    }, function (err, charge) {
        if (err)
            console.log(err);
        else
            response.send({ success: true });
    })
})

app.use(router);
app.listen(8200, function () {
    console.log('Server started');
})