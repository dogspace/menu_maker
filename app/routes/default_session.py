"""Default values for Flask session"""


DEFAULT_SESSION = {
    'tables': [
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        }
    ],

    'menu': {
        'ungrouped': [],
        # 'groupName': [{'id': '', 'title': '', 'items': ''}, {'id': '', 'title': '', 'items': ''}, ...],
    },

    'archive': [
        # {'id': '', 'title': '', 'items': ''},
    ],

    'settings': {
        'color_theme': 0,
        'group_tables': 0,
        'group_menu': 0,
        'number_menu': 0,
        'dish_loc': 0,
        'pin_archive': 0
    }
}




DEFAULT_SESSION_TESTING = {
    'tables': [
        {   'name': 'Protein',
            'groups': [['ungrouped', ['Other1', 'Other2']], ['Chicken', ['Chicken1', 'Chicken2']], ['Beef', ['Beef1', 'Beef2']], ['Vegan', ['Vegan1']]]
        },
        {   'name': 'Side',
            'groups': [['ungrouped', []], ['Pastas', ['Pasta1', 'Pasta2']], ['Breads', ['Bread1', 'Bread2']]]
        },
        {   'name': 'Vegtables',
            'groups': [['ungrouped', ['Veggie1', 'Veggie2']]],
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        },
        {   'name': 'Table name',
            'groups': [['ungrouped', []]]
        }
    ],

    'menu': {
        'ungrouped': [],
        'Starters': [{'id': 'S1', 'title': 'Starter1', 'items': 'Item1, item2, item3'}, {'id': 'S2', 'title': 'Starter2', 'items': 'Item1, item2, item3'}],
        'Entrees': [{'id': 'E1', 'title': 'Entree1', 'items': 'Item1, item2, item3'}, {'id': 'E2', 'title': 'Entree2', 'items': 'Item1, item2, item3'}],        
    },

    'archive': [
        {'id': 'A1', 'title': 'Archive1', 'items': 'Item1, item2, item3'},
    ],

    'settings': {
        'color_theme': 0,
        'group_tables': 0,
        'group_menu': 0,
        'number_menu': 0,
        'dish_loc': 0,
        'pin_archive': 0
    }
}




# DEFAULT_SESSION_BEFORE_REDESIGN = {
#     'names': [
#         {   'group': 'Table Group A',
#             'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] }, 
#         {   'group': 'Table Group B',
#             'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] },
#         {   'group': 'Table Group C',
#             'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] },
#         {   'group': 'Table Group D',
#             'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] },
#         {   'group': 'Table Group E',
#             'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] }
#     ],

#     'tables': [
#         [ [], [], [], [], [], [], [], [], [], [] ],
#         [ [], [], [], [], [], [], [], [], [], [] ],
#         [ [], [], [], [], [], [], [], [], [], [] ],
#         [ [], [], [], [], [], [], [], [], [], [] ],
#         [ [], [], [], [], [], [], [], [], [], [] ]
#     ],

#     'menu': [
#         [],     # [{'id': '', 'title': '', 'items': ''}, ...]
#         [],
#         [],
#         [],
#         []
#     ],

#     'settings': {
#         'color_theme': 0,
#         'split_menu': 0
#     }
# }
