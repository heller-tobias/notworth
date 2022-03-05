const { auth } = require('express-oauth2-jwt-bearer');
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const checkScopes = requiredScopes('read:user');
const jwt = require('jsonwebtoken');

export const checkJwt = auth({
    audience: 'http://localhost:3000',
    issuerBaseURL: `https://dev-3p-kd7td.eu.auth0.com/`,
});

export function setUser(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.decode(token);
    req.body.userId = decoded.sub;
    next();
}

export function parseUserId(req: any): string {
    return req.body.userId;
}

export function checkJwtScopes(req, res, next) {
    return checkScopes(req, res, next);
}