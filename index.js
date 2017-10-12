var stripe = require('stripe')('sk_test_g6sTDyC4v6UeQhcr8bU4MC1Z');
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
    var charge = stripe.charges.create({
        amount: amountpayable * 100,
        currency: 'usd',
        description: 'Charity donation',
        source: stripetoken
    }, function (err, charge) {
        if (err)
            console.log(err);
        else
            response.send({ success: true });
    })
})

router.post('/testpay', function (request, response) {
    console.log(request.body);
    response.send({ testpay: request.body.token });
})

app.use(router);
app.listen(process.env.PORT || 5000, function () {
    console.log('Server started');
})