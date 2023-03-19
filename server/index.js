const express = require("express")
const app = express()

app.get('/', (req, res) => {
    res.send("Hii ANkit ")
})

app.listen(3001, () => {
    console.log("Running on server 3001")
})