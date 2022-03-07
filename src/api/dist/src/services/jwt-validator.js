"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwtScopes = exports.parseUserId = exports.setUser = exports.checkJwt = void 0;
const { auth } = require('express-oauth2-jwt-bearer');
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const checkScopes = requiredScopes('read:user');
const jwt = require('jsonwebtoken');
require("dotenv").config();
exports.checkJwt = auth({
    audience: 'http://localhost:3000',
    issuerBaseURL: `https://dev-3p-kd7td.eu.auth0.com/`,
});
function setUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.decode(token);
    req.body.userId = decoded.sub;
    next();
}
exports.setUser = setUser;
function parseUserId(req) {
    return req.body.userId;
}
exports.parseUserId = parseUserId;
function checkJwtScopes(req, res, next) {
    return checkScopes(req, res, next);
}
exports.checkJwtScopes = checkJwtScopes;
//# sourceMappingURL=jwt-validator.js.map