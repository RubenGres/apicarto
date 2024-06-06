import { Router } from 'express';
import { check, matchedData } from 'express-validator';
import validateParams from '../../middlewares/validateParams.js';
import codesPostaux from 'codes-postaux';

var router = new Router();

router.get('/communes/:codePostal', [
    check('codePostal').matches(/^\d{5}$/).withMessage('Code postal invalide')
], validateParams, function (req, res) {
    const filter = matchedData(req);
    var result = codesPostaux.find(filter.codePostal);
    if (! result.length){
        return res.sendStatus(404);
    }
    res.json(result);
});

export {router};
