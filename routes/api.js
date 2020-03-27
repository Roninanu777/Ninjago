const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');


//get a list of ninjas from database
router.get('/ninjas', (req, res, next) => {
    // Ninja.find({}).then((ninjas) => {
    //     res.send(ninjas);
    // });
    let lng = parseFloat(req.query.lng);
    let lat = parseFloat(req.query.lat);
    
    // Ninja.geoNear(
    //     {type: "Point", coordinates: [lng, lat]},
    //     {maxDistance: 100000, spherical: true}
    // ).then((ninjas) => {
    //     res.send(ninjas);
    // });

    Ninja.aggregate(
        [
           {
               $geoNear: {
                    near: {type: "Point", coordinates: [lng, lat]},
                    distanceField: "dist.calculated",
                    includeLocs: "dist.location",     
                    maxDistance: 100000,
                    spherical: true
               }
           }
        ]
    ).then((ninjas) => res.send(ninjas)).catch(next);
});

//add a new ninja to the db
router.post('/ninjas', (req, res,next) => {
    Ninja.create(req.body).then((ninja) => {
        res.send(ninja);
    }).catch(next);
   
});

//update a ninja in the db
router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Ninja.findOne({ _id: req.params.id }).then((ninja) => {
            res.send(ninja);
        });
    })
});

//delete a ninja from the db
router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndRemove({ _id: req.params.id }).then((ninja) => {
        res.send(ninja);
    });
});


module.exports = router;