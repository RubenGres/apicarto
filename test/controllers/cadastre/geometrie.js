/*eslint-env node, mocha*/

const server = require('../../../server');
const request = require('supertest');
const expect = require('expect.js');

var API_KEY = process.env.GEOPORTAL_API_KEY;

const geom={"type":"Polygon","coordinates":[[[4.79628704723532,45.2245686201141],[4.79627198205696,45.2244810075761],[4.79623301978841,45.2243971554783],[4.7961716578197,45.2243202861855],[4.7960902543159,45.2242533537068],[4.79599193758517,45.2241989301793],[4.795880485857,45.2241591070292],[4.79576018209113,45.2241354146047],[4.79563564939616,45.2241287633715],[4.79551167338089,45.2241394089266],[4.79539301826325,45.224166942177],[4.79528424380096,45.2242103050595],[4.79518953007658,45.2242678311979],[4.79511251686827,45.2243373099351],[4.79505616377777,45.224416071282],[4.79502263649038,45.224501088517],[4.79501322353864,45.2245890944965],[4.79502828676983,45.2246767072062],[4.79506724742323,45.2247605597291],[4.7951286083547,45.2248374296355],[4.79521001155707,45.2249043628231],[4.79530832876809,45.2249587870468],[4.79541978168514,45.2249986107744],[4.79554008716747,45.2250223035697],[4.79566462184518,45.2250289549107],[4.79578859980762,45.2250183091839],[4.79590725654041,45.2249907755084],[4.79601603203994,45.2249474120122],[4.79611074606575,45.2248898851649],[4.79618775879377,45.2248204057315],[4.7962441106954,45.2247416438072],[4.79627763626632,45.2246566262013],[4.79628704723532,45.2245686201141]]]};
const feature={'type':'Feature','geometry':{'type':'Polygon','coordinates':[[[4.79628704723532,45.2245686201141],[4.79627198205696,45.2244810075761],[4.79623301978841,45.2243971554783],[4.7961716578197,45.2243202861855],[4.7960902543159,45.2242533537068],[4.79599193758517,45.2241989301793],[4.795880485857,45.2241591070292],[4.79576018209113,45.2241354146047],[4.79563564939616,45.2241287633715],[4.79551167338089,45.2241394089266],[4.79539301826325,45.224166942177],[4.79528424380096,45.2242103050595],[4.79518953007658,45.2242678311979],[4.79511251686827,45.2243373099351],[4.79505616377777,45.224416071282],[4.79502263649038,45.224501088517],[4.79501322353864,45.2245890944965],[4.79502828676983,45.2246767072062],[4.79506724742323,45.2247605597291],[4.7951286083547,45.2248374296355],[4.79521001155707,45.2249043628231],[4.79530832876809,45.2249587870468],[4.79541978168514,45.2249986107744],[4.79554008716747,45.2250223035697],[4.79566462184518,45.2250289549107],[4.79578859980762,45.2250183091839],[4.79590725654041,45.2249907755084],[4.79601603203994,45.2249474120122],[4.79611074606575,45.2248898851649],[4.79618775879377,45.2248204057315],[4.7962441106954,45.2247416438072],[4.79627763626632,45.2246566262013],[4.79628704723532,45.2245686201141]]]}};

describe('Testing /api/cadastre/geometrie', function() {

    it('should reply with 403 without apikey', function(done){
        request(server)
            .get('/api/cadastre/geometrie')
            .expect(403, done);
    });
if ( typeof API_KEY !== 'undefined' ){

    it('should reply with 200 for valid geom and apikey', function(done) {
        request(server)
            .post('/api/cadastre/geometrie')
            .send({ geom: geom, apikey: API_KEY })
            .expect(200, done);
    });


    function findFeatureBy(featureCollection,attributeName,attributeValue){
        var result = null;
        featureCollection.features.forEach(function(feature){
            if ( feature.properties[attributeName] === attributeValue ){
                result = feature;
            }
        });
        return result;
    }


    it('should reply a FeatureCollection containing a valid Feature', function(done) {
        request(server)
            .post('/api/cadastre/geometrie')
            .send({ geom: geom, apikey: API_KEY })
            .expect(200)
            .expect(res => {
                const featureCollection = res.body;
                expect(featureCollection.type).to.eql('FeatureCollection');
                expect(featureCollection.features.length).to.eql(14);

                const feature = findFeatureBy(featureCollection, 'numero', '1220') ;
                expect(feature).to.not.be.null;
                expect(feature.geometry.type).to.eql('MultiPolygon');
                expect(feature.properties).to.eql({
                    surface_intersection: '132.68',
                    surface_parcelle: '490.00',
                    numero: '1220',
                    feuille: 4,
                    section: '0B',
                    code_dep: '07',
                    nom_com: 'Andance',
                    code_com: '009',
                    com_abs: '000',
                    code_arr: '000'
                });
            })
            .end(done);
    });
} // API_KEY is defined    
    
});
