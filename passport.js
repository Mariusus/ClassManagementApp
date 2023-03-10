const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const Students = mongoose.model('Students');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        Students.findById(jwt_payload.id)
            .then(student => {
                if(student) {
                    return done(null, student);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));
    }));
}