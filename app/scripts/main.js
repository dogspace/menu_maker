
document.addEventListener('DOMContentLoaded', function() {
    var s,
    MenuMaker = {
        settings: {
            'groupSelector': document.querySelector('.group-selector'),
            'groupDropdown': document.querySelector('.group-dropdown'),
            'groupItems': document.querySelectorAll('.group-item'),
            'groupRenameButtons': document.querySelectorAll('.group-rename'),

        },

        // Site init
        init: function() {
            console.log('>> >> >> >> >> >>>>   init   <<<< << << << << <<')
            s = MenuMaker.settings
            MenuMaker.bindUIActions()
        },

        // Bind UI actions
        bindUIActions: function() {
            console.log(">> bindUIActions <<")
            s.groupSelector.addEventListener('click', MenuMaker.toggleGroupDropdown)
            s.groupRenameButtons.forEach(button => { button.addEventListener('click', MenuMaker.renameGroup) })

        },

        // Toggle dropdown menu, assign temporary listener if opened
        toggleGroupDropdown: function() {
            console.log(">> toggleGroupDropdown")
            s.groupDropdown.classList.toggle('hidden')
            if (!s.groupDropdown.classList.contains('hidden')) {
                document.addEventListener('click', MenuMaker.checkDropdownClick, true)
            } else {
                document.removeEventListener('click', MenuMaker.checkDropdownClick, true)
            }
        },

        // Listener, runs while dropdown is open, ends when user clicks outside of dropdown
        checkDropdownClick: function(event) {
            console.log(">> checkClick")
            let target = event.target
            if (!s.groupSelector.contains(target) && !s.groupDropdown.contains(target)) {
                document.removeEventListener('click', MenuMaker.checkDropdownClick, true)
                MenuMaker.toggleGroupDropdown()
            }
        },

        // //
        // renameGroup: function(event) {
        //     let button = event.target.closest('.group-rename')
        //     let groupName = button.previousElementSibling
        //     // UNFINISHED
        // },




    }
    MenuMaker.init()
})