const Product = require('./../models/Product');
const Order = require('./../models/Order');

module.exports = {
    get: {
        index: (req, res) => {
            let {id} = req.params;
            Product.findById(id)
                .then(product => {
                    res.render('order/index', {product});
                })
        },
        status: (req, res) => {
            let query = {};

            if (!req.user.isAdmin) {
                query = {creator: req.user._id};
            }

            Order.find(query)
                .populate('product')
                .then(orders => {
                    let options = {
                        weekday: "long", year: "numeric", month: "short",
                        day: "numeric", hour: "2-digit", minute: "2-digit"
                    };

                    for (order in orders) {
                        let o = orders[order];
                        o.isDelivered = o.status === 'Delivered';
                        o.isPending = o.status === 'Pending';
                        o.isInProgress = o.status === 'In Progress';
                        o.isInTransit = o.status === 'Delivered';

                        o.date = o.orderedOn.toLocaleTimeString("en-us", options);
                    }



                    res.render('order/status', {orders});
                })
        },
        details: (req, res) => {
            let options = {
                weekday: "long", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };

            let {id} = req.params;
            Order.findById(id)
                .populate('product')
                .then(order => {

                    let statuses = {
                        'Pending': false,
                        'In Transit': false,
                        'In Progress': false,
                        'Delivered': false
                    };

                    let status = order.status;
                    statuses[status] = true;

                    let viewData = {
                        order,
                        orderedOn: order.orderedOn.toLocaleTimeString("en-us", options),
                        isPending: statuses['Pending'],
                        isInTransit: statuses['In Transit'],
                        isInProgress: statuses['In Progress'],
                        isDelivered: statuses['Delivered']
                    };
                    console.log(viewData);
                    res.render('order/details', viewData);
                });
        }
    },
    post: {
        create: (req, res) => {
            let {id} = req.params;
            let {toppings} = req.body;
            if (!toppings) {
                toppings = [];
            }

            Order.create({
                creator: req.user._id,
                product: id,
                toppings
            }).then(order => {
                res.redirect('/order/details/' + order._id)
            }).catch(err => {
                res.locals.globalError = err;
                res.redirect('/product/order/' + id);
            });
        },
        update: (req, res) => {
            let statusesMap = {
                pending: 'Pending',
                inTransit: 'In Transit',
                inProgress: 'In Progress',
                delivered: 'Delivered'
            };
            let promises = [];

            for (let id in req.body) {
                promises.push(Order.update({_id: id}, {$set: {status: statusesMap[req.body[id]]}}));
            }

            Promise.all(promises).then(data => {
                res.redirect('/manage/orders');
            }).catch(err => {
                console.log(err);
            })
        }
    }

};