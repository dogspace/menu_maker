
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
            // Dish builder
            'buildContainer': document.querySelector('.dish-build-container'),
            'buildInfo': document.querySelector('.build-info'),
            'buildID': document.querySelector('.build-id'),
            'buildTitle': document.querySelector('.build-title'),
            'buildItems': document.querySelector('.build-items'),
            'buildAdd': document.querySelector('.build-add'),
            'buildDeselect': document.querySelector('.build-deselect'),
            // Tables
            'tables': document.querySelectorAll('.table'),
            'tableItems': document.querySelectorAll('.table-item'),
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
            MenuMaker.updateWithSessionData()
            MenuMaker.bindUIActions()
        },

        // Bind UI actions
        bindUIActions: function() {
            console.log(">> bindUIActions <<")
            s.editModeButton.addEventListener('click', MenuMaker.toggleEditMode)

            s.menuButton.addEventListener('click', MenuMaker.openMenu)

            s.groupSelector.addEventListener('click', MenuMaker.toggleGroupDropdown)
            s.groupRenameButtons.forEach(button => { button.addEventListener('click', MenuMaker.renameGroup) })

            s.buildID.addEventListener('keydown', MenuMaker.checkKeypress, true)
            s.buildTitle.addEventListener('keydown', MenuMaker.checkKeypress, true)

            s.tableItems.forEach(item => { item.addEventListener('click', MenuMaker.selectTableItem) })

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
            s.tableItems = document.querySelectorAll('.table-item')
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
                    let items = dish.items.join(', ')
                    let newDish = MenuMaker.createMenuDishHTML(dish.id, dish.name, items)
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
        createMenuDishHTML: function(id, title, items) {
            return `
                <div class="menu-dish">
                    <div class="dish-info">
                        <div class="dish-id">` + id + `</div>
                        <div class="dish-title">` + title + `</div>
                    </div>
                    <div class="dish-items">` + items + `</div>
                    <div class="dish-delete inactive">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 
                            56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                        </svg>
                    </div>
                </div>`
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

        //
        selectTableItem: function(event) {
            let tableItem = event.target
            if (tableItem.classList[0] != 'table-item') {
                tableItem = tableItem.closest('.table-item')
            }
            let textBox = tableItem.querySelector('.item-content')
            if (textBox.contains(event.target) && s.editModeActive) { return }
            //
            let oldItem = tableItem.parentElement.querySelector('.table-item.selected')
            if (oldItem) {
                if (oldItem != tableItem) { oldItem.classList.toggle('selected') }
            }
            tableItem.classList.toggle('selected')
            MenuMaker.updateBuildBox()
            //
            let itemSelected = document.querySelector('.table-item.selected')
            if ((itemSelected && s.buildInfo.classList.contains('hidden')) ||
                (!itemSelected && !s.buildInfo.classList.contains('hidden'))) {
                    s.buildInfo.classList.toggle('hidden')
            }
        },

        //
        updateBuildBox: function() {
            let itemList = []
            let selectedItems = document.querySelectorAll('.table-item.selected')
            selectedItems.forEach(item => { itemList.push(item.querySelector('.item-content').innerText) })
            let itemString = itemList.join(', ')
            s.buildItems.innerText = itemString
        },

        //
        toggleEditMode: function() {
            console.log(">> toggleEditMode")
            s.editModeButton.classList.toggle('active')
            s.editModeActive = s.editModeButton.classList.contains('active')
            // Toggle listener to handle key presses
            if (s.editModeActive) {
                document.addEventListener('keydown', MenuMaker.checkKeypress, true)
            } else {
                document.removeEventListener('keydown', MenuMaker.checkKeypress, true)
            }
            // Call functions to toggle contentEditable for divs
            MenuMaker.toggleTableEditMode()
            MenuMaker.toggleMenuEditMode()
        },

        // Toggle edit mode for tables
        toggleTableEditMode: function() {
            let tableList = document.querySelectorAll('.table')
            tableList.forEach(table => {
                let tableTitle = table.querySelector('.table-title')
                let tableItems = table.querySelectorAll('.item-content')
                if (s.editModeActive) {
                    tableTitle.style.cursor = 'text'
                    tableTitle.contentEditable = true
                    tableItems.forEach(item => {
                        item.style.cursor = 'text'
                        item.contentEditable = true
                    })
                } else {
                    tableTitle.style.cursor = 'pointer'
                    tableTitle.contentEditable = false
                    tableItems.forEach(item => {
                        item.style.cursor = 'pointer'
                        item.contentEditable = false
                    })
                }
            })
            // Update buttons
            let tableDeleteButtons = document.querySelectorAll('.table-delete')
            tableDeleteButtons.forEach(button => { button.classList.toggle('inactive') })
        },

        // Toggle edit mode for menu
        toggleMenuEditMode: function() {
            let dishList = document.querySelectorAll('.menu-dish')
            dishList.forEach(dish => {
                let dishID = dish.querySelector('.dish-id')
                let dishTitle = dish.querySelector('.dish-title')
                let dishItems = dish.querySelector('.dish-items')
                if (s.editModeActive) {
                    dishID.style.cursor = 'text'
                    dishTitle.style.cursor = 'text'
                    dishItems.style.cursor = 'text'
                    dishID.contentEditable = true
                    dishTitle.contentEditable = true
                    dishItems.contentEditable = true
                } else {
                    dishID.style.cursor = 'pointer'
                    dishTitle.style.cursor = 'pointer'
                    dishItems.style.cursor = 'pointer'
                    dishID.contentEditable = false
                    dishTitle.contentEditable = false
                    dishItems.contentEditable = false
                }
            })
            // Update buttons
            let dishDeleteButtons = document.querySelectorAll('.dish-delete')
            dishDeleteButtons.forEach(button => { button.classList.toggle('inactive') })
        },

        // Check keypresses while in edit mode
        checkKeypress: function(event) {
            console.log("CHECK")
            if (event.key === 'Escape' || event.keyCode === 27) {
                document.removeEventListener('keypress', MenuMaker.checkKeypress, true)
                MenuMaker.toggleEditMode()
            } else if (event.key === 'Enter' || event.keyCode == 13) {
                event.target.blur()
            } else if (event.key === 'Tab' || event.KeyCode == 9) {
                event.preventDefault()
            } else if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g)) {
                let charCount, elementClass
                if (event.target.tagName == 'DIV') {
                    charCount = event.target.innerText.length
                    elementClass = event.target.classList[0]
                } else if (event.target.tagName == 'INPUT') {
                    charCount = event.target.value.length
                    elementClass = event.target.className
                }
                if ((charCount >= 250) ||
                    ((charCount >= 60) && ((elementClass == 'dish-title') || (elementClass == 'build-title'))) ||
                    ((charCount >= 40) && (elementClass == 'item-content')) ||
                    ((charCount >= 25) && (elementClass == 'table-title')) ||
                    ((charCount >= 4) && ((elementClass == 'dish-id') || (elementClass == 'build-id')))) {
                    event.preventDefault()
                }
            }
        },

        //
        openMenu: function() {
            s.menu.classList.toggle('hidden')
        }




    }
    MenuMaker.init()
})