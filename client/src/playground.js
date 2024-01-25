const personas = [
    {
        id:1,
        name:"Carlos",
        Act: [
            {
                id:1,
                name: "Dormir",
                horario: "Noche"
            },
            {
                id:2,
                name: "Almorzar",
                horario: "Dia"
            }
        ]
    },
    {
        id:2,
        name:"Manuel",
        Act: [
            {
                id:1,
                name: "Dormir",
                horario: "Noche"
            },
            {
                id:3,
                name: "Cenar",
                horario: "Noche"
            }
        ]
    },
    {
        id:3,
        name:"Nicolas",
        Act: [
            {
                id:1,
                name: "Dormir",
                horario: "Noche"
            },
            {
                id:3,
                name: "Almorzar",
                horario: "Noche"
            }
        ]
    }
]
const filterPersonas = (actividad) => {
    const filteredPersonas = personas.filter((p) => {
        // Si hay actividades y alguna coincide con el nombre proporcionado, incluir la persona
        return p.Act && p.Act.some((a) => a.name === actividad);
    });

    return filteredPersonas;
}

console.log(filterPersonas("Dormir"));