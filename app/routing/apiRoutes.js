const path = require('path')
const routes = require('express').Router();
const fs = require('fs')

let friendsArray = [];

routes.get('/api/friends', (req, res) => {
    getAllFriends()
    res.json(friendsArray)
});

routes.post('/api/friends', (req, res) => {
    getAllFriends()
    let friend = findFriend(req.body)
    res.send(friend)
    searchDatabase(req.body)
    updateFriendsData()
});

module.exports = routes;

function searchDatabase(body) {
    let isInDatabase = false
    for (let i = 0; i < friendsArray.length; i++) {
        if (friendsArray[i].name === body.name) {
            isInDatabase = true
        }
    }
    if (isInDatabase === false) {
        friendsArray.push(body)
    }
}

function updateFriendsData() {
    fs.writeFileSync(path.join(__dirname, '../data/friends.js'), JSON.stringify(friendsArray), 'utf8')
}

function getAllFriends() {
    let file = fs.readFileSync(path.join(__dirname, '../data/friends.js'), 'utf8')
    if (file !== "") {
        friendsArray = JSON.parse(file)
    }
}

function findFriend(user) {
    let smallestDiff = 1000
    let friend = {}
    let diff = 0
    let subDiff = 0
    for (let i = 0; i < friendsArray.length; i++) {
        diff = 0
        subDiff = 0
        for (let m = 0; m < friendsArray[i].scores.length; m++) {
            subDiff = Math.abs(user.scores[m] - friendsArray[i].scores[m])
            diff = diff + subDiff
        }
        if (diff <= smallestDiff) {
            if (friendsArray[i].name !== user.name) {
                friend = friendsArray[i]
                smallestDiff = diff
            }
        }
    }
    return friend
}