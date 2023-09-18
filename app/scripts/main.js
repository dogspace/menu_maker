
document.addEventListener('DOMContentLoaded', function() {
    var s,
    MenuMaker = {
        settings: {
            'x': 0,
            'tableNames': [],

            'groupSelector': document.querySelector('.group-selector'),
            'groupDropdown': document.querySelector('.group-dropdown'),
            'groupItems': document.querySelectorAll('.group-item'),

        },

        //
        init: function() {
            console.log('>> >> >> >> >> >>>>   init   <<<< << << << << <<')
            s = MenuMaker.settings
            MenuMaker.bindUIActions()
        },

        bindUIActions: function() {
            console.log(">> bindUIActions <<")

            s.groupSelector.addEventListener('click', MenuMaker.toggleGroupDropdown)
        },


        toggleGroupDropdown: function() {
            s.groupDropdown.classList.toggle('hidden')

        },




    }
    MenuMaker.init()
})