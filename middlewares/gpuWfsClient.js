import GeoportalWfsClient from 'geoportal-wfs-client';
/*
 * middleware pour la création du client geoportail
 */
var gpuWfsClient = function (req, res, next) {
    var referer = 'http://localhost';

    /* forward du referer du client */
    if ( req.headers.referer ){
        referer = req.headers.referer ;
    }

    req.gpuWfsClient = new GeoportalWfsClient({
        'defaultGeomFieldName': 'the_geom',
        url: 'https://data.geopf.fr/wfs/ows',
        'headers':{
            Referer: referer,
            'User-Agent': 'apicarto'
        }
    });
    next();
};

export default gpuWfsClient;