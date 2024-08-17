const UssdMenu = require("ussd-builder");
let menu = new UssdMenu();
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();

menu.startState({
    run: () => {
        menu.con("Welcome. Choose option:" + "\n1. Show Balance" + "\n2. Buy Airtime");
    },
    next: {
        1: "showBalance",
        2: "buyAirtime",
    },
});

menu.state("showBalance", {
    run: () => {
        menu.end("Your balance is ksh.200");
    },
});

menu.state("buyAirtime", {
    run: () => {
        menu.con("Enter amount:");
    },
    next: {
        "*\\d+": "buyAirtime.amount",
    },
});

menu.state("buyAirtime.amount", {
    run: () => {
        var amount = Number(menu.val);
        menu.end(`successfully purchased airtime worth ${amount}`);
    },
});

app.post("/ussd", (req, res) => {
    menu.run(req.body, (ussdResult) => {
        res.send(ussdResult);
    });
});

app.listen(PORT, () => console.info(`ussd server running on port ${PORT}`));
