const { dayOfPlay } = require("./../config.json")

function getNextDayOfWeek(date) {
    // Code to check that date and dayOfPlay are valid left as an exercise ;)

    var resultDate = new Date(date.getTime());

    resultDate.setDate(date.getDate() + (7 + dayOfPlay - date.getDay()) % 7);

    return resultDate;
}

module.exports = { 
    async getMenu() {
        return {
            "Owner": undefined,
            "Main": "",
            "Sides": [],
            "Date": ""
        }
    },
    async saveMenu(newMenu) {
        //ToDo
    }
}
