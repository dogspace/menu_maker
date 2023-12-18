

const DEFAULT_STORAGE = {
    "tables": [
        {   "name": "Table name",
            "groups": [{ "name": "ungrouped", "items": [] }]
        },
        {   "name": "Table name",
            "groups": [{ "name": "ungrouped", "items": [] }]
        },
        {   "name": "Table name",
            "groups": [{ "name": "ungrouped", "items": [] }]
        },
        {   "name": "Table name",
            "groups": [{ "name": "ungrouped", "items": [] }]
        },
        {   "name": "Table name",
            "groups": [{ "name": "ungrouped", "items": [] }]
        },
        {   "name": "Table name",
            "groups": [{ "name": "ungrouped", "items": [] }]
        },
        {   "name": "Table name",
            "groups": [{ "name": "ungrouped", "items": [] }]
        },
        {   "name": "Table name",
            "groups": [{ "name": "ungrouped", "items": [] }]
        },
        {   "name": "Table name",
            "groups": [{ "name": "ungrouped", "items": [] }]
        },
        {   "name": "Table name",
            "groups": [{ "name": "ungrouped", "items": [] }]
        }
    ],
    "menu": {
        "ungrouped": [],
        // "groupName": [{"id": "", "title": "", "items": ""}, {"id": "", "title": "", "items": ""}, ...],
    },
    "archive": [
        // {"id": "", "title": "", "items": ""},
    ],
    "settings": {
        "color_theme": 0,
        "dish_loc": 0,
        "group_tables": 0,
        "group_menu": 0,
        "number_menu": 0,
        "pin_archive": 0
    }
}


const DEFAULT_STORAGE_TESTING = {
    "tables": [
        {   "name": "Protein",
            "groups": [ {"name": "ungrouped", "items": ["Other1", "Other2"]},
                        {"name": "Chicken",   "items": ["Chicken1", "Chicken2"]},
                        {"name": "Beef",      "items": ["Beef1", "Beef2"]},
                        {"name": "Vegan",     "items": ["Vegan1"]} ]
        },
        {   "name": "Side",
            "groups": [ {"name": "ungrouped", "items": []},
                        {"name": "Pastas",    "items": ["Pasta1", "Pasta2"]},
                        {"name": "Breads",    "items": ["Bread1", "Bread2"]} ]
        },
        {   "name": "Vegtables",
            "groups": [ {"name": "ungrouped", "items": ["Veggie1", "Veggie2"]} ],
        },
        {   "name": "Table name",
            "groups": [["ungrouped", []]]
        },
        {   "name": "Table name",
            "groups": [["ungrouped", []]]
        },
        {   "name": "Table name",
            "groups": [["ungrouped", []]]
        },
        {   "name": "Table name",
            "groups": [["ungrouped", []]]
        },
        {   "name": "Table name",
            "groups": [["ungrouped", []]]
        },
        {   "name": "Table name",
            "groups": [["ungrouped", []]]
        },
        {   "name": "Table name",
            "groups": [["ungrouped", []]]
        }
    ],
    "menu": [
        ["ungrouped", [{"id": "UG1", "title": "Other1", "items": "Item1, item2, item3"}]],
        ["Starters", [{"id": "S1", "title": "Starter1", "items": "Item1, item2, item3"}, {"id": "S2", "title": "Starter2", "items": "Item1, item2, item3"}]],
        ["Entrees", [{"id": "E1", "title": "Entree1", "items": "Item1, item2, item3"}, {"id": "E2", "title": "Entree2", "items": "Item1, item2, item3"}]]
    ],
    "archive": [
        {"id": "A1", "title": "Archive1", "items": "Item1, item2, item3"},
    ],
    "settings": {
        "color_theme": 0,
        "group_tables": 0,
        "group_menu": 0,
        "number_menu": 0,
        "dish_loc": 0,
        "pin_archive": 0
    }
}


export {
    DEFAULT_STORAGE as DEFAULT_STORAGE,
    DEFAULT_STORAGE_TESTING as DEFAULT_STORAGE_TESTING
}
