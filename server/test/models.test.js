const { Country, Activity } = require("../src/db.js")

describe("Testeo de Modelos", () => {
    describe("Modelo Country", () => {
        test.only("Deberia tener los paises con sus respectivas propiedades", async () => {
            const country = await Country.findOne({where:{name: "Argentina"}})
            expect(country).toHaveProperty("id");
            expect(country).toHaveProperty("name");
            expect(country).toHaveProperty("continent");
            expect(country).toHaveProperty("capital");
            expect(country).toHaveProperty("flag");
        })
    })
    describe("Modelo Activity", () => {
        test.only("Deberia tener las actividades con sus respectivas propiedades", async () => {
            const activity = await Activity.findOne({where:{name: "Buceo"}})
            expect(activity).toHaveProperty("id");
            expect(activity).toHaveProperty("name");
            expect(activity).toHaveProperty("season");
            expect(activity).toHaveProperty("duration");
            expect(activity).toHaveProperty("dificult");
        })
    })
})