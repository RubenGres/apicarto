import { Router } from 'express';
import format from 'pg-format';
import pgClient from '../../middlewares/pgClient.js';

var router = new Router();

/**
 * Contrôle de l'accès à la BDD
 */
router.get('/db', pgClient, function(req, res, next) {
    var sql = format('SELECT * FROM pg_stat_activity LIMIT 1');
    req.pgClient.query(sql,function(err,result){  
        if(result) return res.status(200).send({status: 'success'});
        if (err) return next(err);
    });
});

export {router};
