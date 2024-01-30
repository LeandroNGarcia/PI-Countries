const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");
const data = require("../../api/db.json");

let countries = data.countries;
countries.forEach(async (c) => {
  await Country.findOrCreate({
    where: {
      id: c.cca3,
      name: c.name.common,
      continent: c.continents[0],
      capital: c.capital ? c.capital[0] : "",
      population: c.population,
      subRegion: c.subregion ? c.subregion : "",
      flag: c.cca3 === "AND" ? c.flags.png : c.flags.svg,
      area: c.area,
      maps: c.maps.googleMaps,
    },
  });
});

const allCountries = async () => {
  const countries = await Country.findAll({
    order: [["name", "ASC"]],
    include: [
      {
        model: Activity,
        attributes: ["id", "name", "dificult", "duration", "season"],
      }
    ]
  });
  return countries;
};

const countryById = async (id) => {
  const country = await Country.findByPk(id, {
    include: [
      {
        model: Activity,
        attributes: ["id", "name", "dificult", "duration", "season"],
      },
    ],
  });
  return country;
};

const countryByName = async (name) => {
  const country = await Country.findAll({
    order: [["name", "ASC"]],
    where: {
      name: {
        [Op.iLike]: `${name}%`,
      },
    },
  });
  return country;
};

const addActivities = async (name, dificult, duration, season, countryId, countryId2, countryId3) => {
  try {
    const [activity, created] = await Activity.findOrCreate({
      where: {
        name,
        dificult,
        duration: duration ? duration : "0",
        season,
      },
    });
    const asociated = async (cId, activity) => {
      const nation = await Country.findByPk(cId);
      await activity.addCountries(nation);
    }
    await asociated(countryId, activity);
    if(countryId2){
      await asociated(countryId2, activity);
    }
    if(countryId3){
      await asociated(countryId3, activity);
    }
    return {
      create: true,
    };
  } catch (error) {
    return {
      create: false,
      error: error,
    };
  }
};

const removeAct = async (countryId, activityId) => {
  try {
    const country = await Country.findByPk(countryId);
    const activity = await Activity.findByPk(Number(activityId));
    if (!country || !activity)
      throw new Error("Pais y/o Actividad no encontrada");
    await country.removeActivity(activity);
    return "Actividad Eliminada";
  } catch (error) {
    throw Error(error);
  }
};

const deleteAct = async (actId) => {
  try {
    await Activity.destroy({
      where:{
        id: actId
      }
    })
    .then(() => {return "Actividad Eliminada Globalmente"})
    .catch((error) => {throw error})
  } catch (error) {
    throw Error(error)
  }
}

const getActivities = async () => {
  try {
    const activities = await Activity.findAll({
      include:[
        {
          model: Country,
          attributes: ["id", "name", "flag"]
        }
      ]
    });
    return activities;
  } catch (error) {
    throw Error(error);
  }
};

const editActivity = async (id, name, season, duration, dificult) => {
  try {
    await Activity.update({
      name: name,
      dificult: dificult,
      duration: duration,
      season: season
    },
    {
      where: {
        id: id
      }
    });
    return "Actividad Actualizada"
    } catch (error) {
      throw error
    }
}

module.exports = {
  allCountries,
  addActivities,
  countryById,
  countryByName,
  removeAct,
  deleteAct,
  getActivities,
  editActivity
};
