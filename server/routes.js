/**
 * Main application routes
 */

    'use strict';

    import errors from './components/errors';
    import path from 'path';

    //json token
    import expressJwt from 'express-jwt';
    import jwt from 'jsonwebtoken';

    export default function(app) {
    // Insert routes below


    //Change Secret!
    var secret = "moo";
    app.use('/api', expressJwt({secret: secret}));

    //api
    app.use('/api/things', require('./api/thing'));
    //app.use('/api/register', require('./api/register'));
    

    app.post('/authenticate',(req,res)=>{
          //TODO validate req.body.username and req.body.password
        //if is invalid, return 401
        if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
            res.send(401, 'Wrong user or password');
            return;
        }

        var profile = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@doe.com',
            id: 123
        };

          // We are sending the profile inside the token
        var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

        res.json({ token: token });
    });
         

    app.route('/')
        .get((req, res)=>{
            console.log("cookies: ", req.cookies);
            console.log("signed cookies: ", req.signedCookies);
            console.log(req.subdomains);
            res.send('index');
        });

    app.route('/cookie')
        .get((req, res) => {
            res.cookie('test',12, { signed:true, domain:'localhost.moo'});
            res.send('hello! you get a cookie');
        });
    app.route('/login')
        .get((req, res) => {
            console.log("login");
            console.log(app.get('appPath'));
            console.log(path.resolve(app.get('appPath') + '/index.html'));
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });




    // All undefined asset or api routes should return a 404
    /*
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);
        */
        
    app.route('*').get(errors[404]);

}
