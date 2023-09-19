
document.addEventListener('DOMContentLoaded', function() {
    var s,
    MenuMaker = {
        settings: {
            // Edit mode
            'editModeButton': document.querySelector('.edit-icon'),
            'editModeActive': false,

            // Group dropdown selector
            'groupSelector': document.querySelector('.group-selector'),
            'groupDropdown': document.querySelector('.group-dropdown'),
            'groupItems': document.querySelectorAll('.group-item'),
            'groupRenameButtons': document.querySelectorAll('.group-rename'),

            // Tables

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
            s.editModeButton.addEventListener('click', MenuMaker.toggleEditMode)


            s.groupSelector.addEventListener('click', MenuMaker.toggleGroupDropdown)
            s.groupRenameButtons.forEach(button => { button.addEventListener('click', MenuMaker.renameGroup) })

        },

        //
        toggleEditMode: function() {
            console.log(">> toggleEditMode")
            s.editModeButton.classList.toggle('active')
            s.editModeActive = s.editModeButton.classList.contains('active')
            console.log("EDIT MODE TURNED " + s.editModeActive)
            // Call functions to toggle contentEditable for divs
            MenuMaker.toggleTableEditMode()

            // Update buttons
            let tableDeleteButtons = document.querySelectorAll('.table-delete')
            tableDeleteButtons.forEach(button => { button.classList.toggle('inactive') })
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

        // Change table rows to be editable
        toggleTableEditMode: function() {
            let tableTitleList = document.querySelectorAll('.table-title')
            let tableContentList = document.querySelectorAll('.item-content')
            if (s.editModeActive) {
                document.addEventListener('keydown', MenuMaker.checkKeypress, true)
                tableTitleList.forEach(title => {
                    title.style.cursor = 'text'
                    title.contentEditable = true
                })
                tableContentList.forEach(item => {
                    item.style.cursor = 'text'
                    item.contentEditable = true
                })
            } else {
                document.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                tableTitleList.forEach(title => {
                    title.style.cursor = 'pointer'
                    title.contentEditable = false
                })
                tableContentList.forEach(item => {
                    item.style.cursor = 'pointer'
                    item.contentEditable = false
                })
            }
        },

        // Check keypresses while in edit mode
        checkKeypress: function(event) {
            if (event.key === 'Escape' || event.keyCode === 27) {
                document.removeEventListener('keypress', MenuMaker.checkKeypress, true)
                MenuMaker.toggleEditMode()
            } else if (event.key === 'Enter' || event.keyCode == 13) {
                event.target.blur()
            } else if (event.key === 'Tab' || event.KeyCode == 9) {
                event.preventDefault()
            } else if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g)) {
                if (event.target.innerText.length >= 40) { event.preventDefault() }
            }
        }




    }
    MenuMaker.init()
})