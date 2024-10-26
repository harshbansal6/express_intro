const userDb = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data} 
}

const path = require('path');
const bcrypt = require('bcrypt');
const fsPromises = require('fs').promises;


const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if ( !user || !pwd ) return res.send(400).json({'message':'username and password are required'});
    const duplicate = userDb.users.find(person => person.username === user);
    if (duplicate) return res.status(409);

}