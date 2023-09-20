
document.addEventListener('DOMContentLoaded', function() {
    var s,
    MenuMaker = {
        settings: {
            // JS copy of session data, updated and POSTed to Flask
            'sessionData': session,

            // Edit mode
            'editModeButton': document.querySelector('.edit-icon'),
            'editModeActive': false,

            // Group dropdown selector
            'groupSelector': document.querySelector('.group-selector'),
            'groupDropdown': document.querySelector('.group-dropdown'),
            'groupItems': document.querySelectorAll('.group-item'),
            'groupNames': document.querySelectorAll('.group-name'),
            'groupRenameButtons': document.querySelectorAll('.group-rename'),

            // Tables
            'tables': document.querySelectorAll('.table'),


            // Menu
            'menu': document.querySelector('.menu'),
            'menuGroups': document.querySelectorAll('.menu-group'),

            'menuButton': document.querySelector('.menu-button'),
        },

        // Site init
        init: function() {
            console.log('>> >> >> >> >> >>>>   init   <<<< << << << << <<')
            s = MenuMaker.settings
            console.log(s.sessionData)
            MenuMaker.bindUIActions()
            MenuMaker.updateWithSessionData()
        },

        // Bind UI actions
        bindUIActions: function() {
            console.log(">> bindUIActions <<")
            s.editModeButton.addEventListener('click', MenuMaker.toggleEditMode)

            s.menuButton.addEventListener('click', MenuMaker.openMenu)

            s.groupSelector.addEventListener('click', MenuMaker.toggleGroupDropdown)
            s.groupRenameButtons.forEach(button => { button.addEventListener('click', MenuMaker.renameGroup) })

        },

        // Updates site with session data, [[assumes group 1 is set, not saving active group to session]]
        updateWithSessionData: function() {
            // Update group names
            for (let x = 0; x < 5; x++) {
                s.groupNames[x].innerText = s.sessionData.names[x].group
            }
            // Update dropdown button
            s.groupSelector.querySelector('.active-group-name').innerText = s.sessionData.names[0].group
            // Update tables
            for (let x = 0; x < 10; x++) {
                s.tables[x].querySelector('.table-title').innerText = s.sessionData.names[0].tables[x]
                // Create table items
                let itemCount = s.sessionData.tables[0][x].length
                for (let y = 0; y < itemCount; y++) {
                    let newItem = MenuMaker.createTableItemHTML(s.sessionData.tables[0][x][y])
                    s.tables[x].querySelector('.table-items').innerHTML += newItem
                }
                // Hide or unhide table based on itemCount
                let tableHidden = s.tables[x].classList.contains('hidden')
                if ((itemCount && tableHidden) || (!itemCount && !tableHidden)) {
                    s.tables[x].classList.toggle('hidden')
                }
            }
            // Update menu
            for (let x = 0; x < 5; x++) {
                let dishCount = s.sessionData.menu[x].length
                if (dishCount == 0) { continue }
                // Unhide group and set title
                s.menuGroups[x].classList.remove('hidden')
                s.menuGroups[x].querySelector('.menu-group-name').innerText = s.sessionData.names[x].group
                // Create dishes
                let dishContainer = s.menuGroups[x].querySelector('.menu-group-dishes')
                for (let y = 0; y < dishCount; y++) {
                    let dish = s.sessionData.menu[x][y]
                    let ingredients = dish.items.join(', ')
                    console.log(dish)
                    let newDish = MenuMaker.createMenuDishHTML(dish.id, dish.name, ingredients)
                    dishContainer.innerHTML += newDish
                }
            }
        },

        //
        createTableItemHTML: function(text) {
            return `
                <div class="table-item">
                    <div class="item-checkbox"><span class="circle"></span></div>
                    <div class="item-content">` + text + `</div>
                </div>`
        },

        //
        createMenuDishHTML: function(id, title, ingredients) {
            return `
                <div class="menu-dish">
                    <div class="dish-info">
                        <div class="dish-id">` + id + `</div>
                        <div class="dish-title">` + title + `</div>
                    </div>
                    <div class="dish-ingredients">` + ingredients + `</div>
                    <div class="dish-delete inactive">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 
                            56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                        </svg>
                    </div>
                </div>`
        },

        //
        toggleEditMode: function() {
            console.log(">> toggleEditMode")
            s.editModeButton.classList.toggle('active')
            s.editModeActive = s.editModeButton.classList.contains('active')
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

        //
        toggleMenuEditMode: function() {
            return


            
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
        },

        //
        openMenu: function() {
            s.menu.classList.toggle('hidden')
        }




    }
    MenuMaker.init()
})