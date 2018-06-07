var Router = require('express').Router;
var router = new Router();

const { check } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

const validateParams = require('../../middlewares/validateParams');
const {isGeometry,isCodeInsee} = require('../../checker');
const parseInseeCode = require('../../helper/parseInseeCode');

const gppWfsClient = require('../../middlewares/gppWfsClient');

const _ = require('lodash');



/**
 * Creation d'une chaîne de proxy sur le GPP
 * @param {Object} typeName 
 */
function createGppProxy(typeName){
    return [
        validateParams,
        gppWfsClient,
        function(req,res){
            var params = matchedData(req);
            params._limit = 100;
            req.gppWfsClient.getFeatures(typeName, params)
                .then(function(featureCollection) {
                    res.json(featureCollection);
                })
                
                .catch(function(err) {
                    res.status(500).json(err);
                })
            ;
        }
    ];
}


router.get('/appellation-viticole', [
    check('new_insee').optional().custom(isCodeInsee),
    check('geom').exists().custom(isGeometry)
], createGppProxy('AOC-VITICOLES:aire_parcellaire'));
router.post('/appellation-viticole', [
    check('geom').exists().custom(isGeometry)
], createGppProxy('AOC-VITICOLES:aire_parcellaire'));



module.exports=router;
