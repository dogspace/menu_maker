"""Default values for Flask session"""


DEFAULT_SESSION = {
    'names': [
        {   'group': 'Table Group A',
            'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] }, 
        {   'group': 'Table Group B',
            'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] },
        {   'group': 'Table Group C',
            'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] },
        {   'group': 'Table Group D',
            'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] },
        {   'group': 'Table Group E',
            'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] }
    ],

    'tables': [
        [ [], [], [], [], [], [], [], [], [], [] ],
        [ [], [], [], [], [], [], [], [], [], [] ],
        [ [], [], [], [], [], [], [], [], [], [] ],
        [ [], [], [], [], [], [], [], [], [], [] ],
        [ [], [], [], [], [], [], [], [], [], [] ]
    ],

    'menu': [
        [],     # [{'name': '', 'number': '', 'items': ''}, ...]
        [],
        [],
        [],
        []
    ],

    'settings': {
        'color_theme': 0,
        'split_menu': 0
    }
}



DEFAULT_SESSION_TESTING = {
    'names': [
        {   'group': 'Breakfast',
            'tables': ['A1', 'A2', 'A3', 'A4' , 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'] }, 
        {   'group': 'Lunch Starters/Sides',
            'tables': ['B1', 'B2', 'B3', 'B4' , 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'] },
        {   'group': 'Lunch Entrees',
            'tables': ['C1', 'C2', 'C3', 'C4' , 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'] },
        {   'group': 'Dinner Starters/Sides',
            'tables': ['D1', 'D2', 'D3', 'D4' , 'D5', 'D6', 'D7', 'D8', 'D9', 'D10'] },
        {   'group': 'Dinner Entrees',
            'tables': ['E1', 'E2', 'E3', 'E4' , 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'] }
    ],

    'tables': [
        [ ['Pancakes', 'Waffles', 'Eggs'], ['Eggs'], ['Bacon', 'Hash browns'], [], [], [], [], [], [], [] ],
        [ ['Grilled chicken', 'Ribeye', 'Salmon'], ['Cajun', 'Adobo'], ['Mango sauce', 'BBQ'], ['Rice', 'Bread'], ['Corn', 'Green beans', 'Snow peas'], [], [], [], [], [] ],
        [ ['test c1.1', 'test c1.2'], ['test c2.1', 'test c2.2'], ['test c3.1', 'test c3.2'], ['test c4.1', 'test c4.2'], ['test c5.1', 'test c5.2'], [], [], [], [], [] ],
        [ ['test d1.1', 'test d1.2'], ['test d2.1', 'test d2.2'], ['test d3.1', 'test d3.2'], ['test d4.1', 'test d4.2'], ['test d5.1', 'test d5.2'], [], [], [], [], [] ],
        [ ['test e1.1', 'test e1.2'], ['test e2.1', 'test e2.2'], ['test e3.1', 'test e3.2'], ['test e4.1', 'test e4.2'], ['test e5.1', 'test e5.2'], [], [], [], [], [] ],
    ],

    'menu': [
        [   {'name': 'Waffles and Bacon', 'id': 'A1', 'items': ['Waffles', 'Bacon']}, 
            {'name': 'Eggy', 'id': 'A2', 'items': ['Eggs', 'Eggs', 'Hash browns']} ],
        [   {'name': 'Mango chicken', 'id': 'B1', 'items': ['Grilled chicken', 'Cajun', 'Mango sauce', 'Rice', 'Corn']},
            {'name': 'Steak and stuff', 'id': 'B2', 'items': ['Ribeye', 'Rice', 'Snow peas']} ],
        [],
        [],
        []
    ],

    'settings': {
        'edit_mode': 0,
        'color_theme': 0
    }
}




################################# SESSIONS WITH KEYS TEMP
# DEFAULT_SESSION = {
#     'names': {
#         'A': {  'group': 'Table Group A',
#                 'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] }, 
#         'B': {  'group': 'Table Group B',
#                 'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] },
#         'C': {  'group': 'Table Group C',
#                 'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] },
#         'D': {  'group': 'Table Group D',
#                 'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] },
#         'E': {  'group': 'Table Group E',
#                 'tables': ['Table name', 'Table name', 'Table name', 'Table name' , 'Table name', 'Table name', 'Table name', 'Table name', 'Table name' , 'Table name'] }
#     },

#     'tables': {
#         'A': [ [], [], [], [], [], [], [], [], [], [] ],
#         'B': [ [], [], [], [], [], [], [], [], [], [] ],
#         'C': [ [], [], [], [], [], [], [], [], [], [] ],
#         'D': [ [], [], [], [], [], [], [], [], [], [] ],
#         'E': [ [], [], [], [], [], [], [], [], [], [] ]
#     },

#     'menu': {
#         'A': [],     # [{'name': '', 'number': '', 'items': ''}, ...]
#         'B': [],
#         'C': [],
#         'D': [],
#         'E': []
#     },

#     'settings': {
#         'edit_mode': 0,
#         'color_theme': 0
#     }
# }

# DEFAULT_SESSION_TESTING = {
#     'names': {
#         'A': {  'group': 'Breakfast',
#                 'tables': ['A1', 'A2', 'A3', 'A4' , 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'] }, 
#         'B': {  'group': 'Lunch Starters/Sides',
#                 'tables': ['B1', 'B2', 'B3', 'B4' , 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'] },
#         'C': {  'group': 'Lunch Entrees',
#                 'tables': ['C1', 'C2', 'C3', 'C4' , 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'] },
#         'D': {  'group': 'Dinner Starters/Sides',
#                 'tables': ['D1', 'D2', 'D3', 'D4' , 'D5', 'D6', 'D7', 'D8', 'D9', 'D10'] },
#         'E': {  'group': 'Dinner Entrees',
#                 'tables': ['E1', 'E2', 'E3', 'E4' , 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'] }
#     },

#     'tables': {
#         'A': [ ['Pancakes', 'Waffles', 'Eggs'], ['Eggs'], ['Bacon', 'Hash browns'], [], [], [], [], [], [], [] ],
#         'B': [ ['Grilled chicken', 'Ribeye', 'Salmon'], ['Cajun', 'Adobo'], ['Mango sauce', 'BBQ'], ['Rice', 'Bread'], ['Corn', 'Green beans', 'Snow peas'], [], [], [], [], [] ],
#         'C': [ ['test c1.1', 'test c1.2'], ['test c2.1', 'test c2.2'], ['test c3.1', 'test c3.2'], ['test c4.1', 'test c4.2'], ['test c5.1', 'test c5.2'], [], [], [], [], [] ],
#         'D': [ ['test d1.1', 'test d1.2'], ['test d2.1', 'test d2.2'], ['test d3.1', 'test d3.2'], ['test d4.1', 'test d4.2'], ['test d5.1', 'test d5.2'], [], [], [], [], [] ],
#         'E': [ ['test e1.1', 'test e1.2'], ['test e2.1', 'test e2.2'], ['test e3.1', 'test e3.2'], ['test e4.1', 'test e4.2'], ['test e5.1', 'test e5.2'], [], [], [], [], [] ],
#     },

#     'menu': [
#         'A': [   {'name': 'Waffles and Bacon', 'id': 'A1', 'items': ['Waffles', 'Bacon']}, 
#             {'name': 'Eggy', 'id': 'A2', 'items': ['Eggs', 'Eggs', 'Hash browns']} ],
#         'B': [   {'name': 'Mango chicken', 'id': 'B1', 'items': ['Grilled chicken', 'Cajun', 'Mango sauce', 'Rice', 'Corn']},
#             {'name': 'Steak and stuff', 'id': 'B2', 'items': ['Ribeye', 'Rice', 'Snow peas']} ],
#         'C': [],
#         'D': [],
#         'E': []
#     ],

#     'settings': {
#         'edit_mode': 0,
#         'color_theme': 0
#     }
# }
