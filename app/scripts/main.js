
document.addEventListener('DOMContentLoaded', function() {
    var s,
    MenuMaker = {
        settings: {
            // JS copy of session data, updated and POSTed to Flask
            'sessionData': session,
            'sessionKeys': ['names', 'tables', 'menu', 'settings'],
            'groupIndex': 0,
            // Header
            'editModeButton': document.querySelector('.edit-icon'),
            'editModeActive': false,
            'groupRenameActive': false,
            'settingsButton': document.querySelector('.settings-icon'),
            'settingsMenu': document.querySelector('.settings-menu'),
            'colorThemeButton': document.querySelector('.color-theme'),
            'colorThemeSpan': document.querySelector('.color-theme span'),
            'splitMenuButton': document.querySelector('.split-menu'),
            'splitMenuSpan': document.querySelector('.split-menu span'),
            'exportDataButton': document.querySelector('.export-data'),
            'importDataButton': document.querySelector('.import-data'),
            'deleteAllButton': document.querySelector('.delete-all'),
            'colorOrder': ['DARK', 'LIGHT', 'GREY', 'SEPIA'],
            // Group dropdown selector
            'groupSelector': document.querySelector('.group-selector'),
            'groupSelectorName': document.querySelector('.active-group-name'),
            'groupDropdown': document.querySelector('.group-dropdown'),
            'groupItems': document.querySelectorAll('.group-item'),
            'groupNames': document.querySelectorAll('.group-name'),
            'groupRenameButtons': document.querySelectorAll('.group-rename'),
            'groupOrder': ['A', 'B', 'C', 'D', 'E'],
            'oldGroupName': '',
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
            'tableHeaders': document.querySelectorAll('.table-header'),
            'tableControlButtons': document.querySelectorAll('.table-control-icon'),
            'tableControlMenus': document.querySelectorAll('.table-control-menu'),
            'tableDeleteButtons': document.querySelectorAll('.table-delete'),
            'tableInputs': document.querySelectorAll('.table-input'),
            'tableOrder': ['_0', '_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8', '_9'],
            // Menu
            'menu': document.querySelector('.menu'),
            'menuGroups': document.querySelectorAll('.menu-group'),
            'menuGroupNames': document.querySelectorAll('.menu-group-name'),
            'menuButton': document.querySelector('.menu-button'),
            //
            'popupContainer': document.querySelector('.popup-container'),
            'popupBox': document.querySelector('.popup'),
            'popupWarning': document.querySelector('.popup-warning'),
            'popupHeader': document.querySelector('.popup-header'),
            'popupBody': document.querySelector('.popup-body'),
            'popupOverlay': document.querySelector('.popup-overlay'),
            //
            'dragItem': null,
            'dragClone': null,
            'dragged': false,
            'startPos': {},
            'lastHover': '',
        },

        // Site init
        init: function() {
            console.log('>> >> >> >> >> >>>>   init   <<<< << << << << <<')
            s = MenuMaker.settings
            console.log(s.sessionData)
            MenuMaker.updateWithSessionData()
            MenuMaker.bindStaticUIActions()
            MenuMaker.bindDynamicUIActions()
            MenuMaker.setColorTheme()
            MenuMaker.setMenuSplit()
        },

        // Bind Static UI actions (called at init)
        bindStaticUIActions: function() {
            console.log(">> bindUIActions <<")
            s.editModeButton.addEventListener('click', MenuMaker.toggleEditMode)
            s.settingsButton.addEventListener('click', MenuMaker.toggleSettingsMenu)
            s.colorThemeButton.addEventListener('click', MenuMaker.changeColorTheme)
            s.splitMenuButton.addEventListener('click', MenuMaker.toggleMenuSplit)
            s.exportDataButton.addEventListener('click', MenuMaker.exportData)
            s.importDataButton.addEventListener('click', MenuMaker.importData)

            s.menuButton.addEventListener('click', MenuMaker.openMenu)

            s.groupSelector.addEventListener('click', MenuMaker.toggleGroupDropdown)
            s.groupRenameButtons.forEach(button => { button.addEventListener('click', MenuMaker.renameGroup) })
            s.groupNames.forEach(group => { group.addEventListener('click', MenuMaker.changeGroup) })

            s.buildID.addEventListener('keydown', MenuMaker.checkKeypress, true)
            s.buildTitle.addEventListener('keydown', MenuMaker.checkKeypress, true)
            s.buildAdd.addEventListener('click', MenuMaker.createNewMenuDish)
            s.buildDeselect.addEventListener('click', MenuMaker.deselectAllItems)

            s.tableControlButtons.forEach(button => { button.addEventListener('click', MenuMaker.toggleTableControlMenu) })
            s.tableDeleteButtons.forEach(button => { button.addEventListener('click', MenuMaker.deleteTableItems )})
            s.tableInputs.forEach(input => { input.addEventListener('keydown', MenuMaker.checkKeypress, true) })
        },

        // Bind dynamic UI actions (called at init and after creating a new table/menu item)
        bindDynamicUIActions: function() {
            let tableItems = document.querySelectorAll('.table-item')
            //tableItems.forEach(item => { item.addEventListener('click', MenuMaker.selectTableItem) })
            tableItems.forEach(item => { item.addEventListener('mousedown', MenuMaker.clickElement) })

            let dishDeleteButtons = s.menu.querySelectorAll('.dish-delete')
            dishDeleteButtons.forEach(button => { button.addEventListener('click', MenuMaker.deleteMenuDish) })
        },

        // Updates site with session data, [[assumes group 1 is set, not saving active group to session]]
        updateWithSessionData: function() {
            console.log(">> updateWithSessionData")
            // Update dropdown button
            s.groupSelector.querySelector('.active-group-name').innerText = s.sessionData.names[0].group
            let groupA = document.querySelector('.group-item.A')
            if (!groupA.classList.contains('active')) {
                let activeGroup = document.querySelector('.group-item.active')
                activeGroup.classList.remove('active')
                groupA.classList.add('active')
            }
            // Update group names
            for (let x = 0; x < 5; x++) {
                s.groupNames[x].innerText = s.sessionData.names[x].group
            }
            // Update tables
            for (let x = 0; x < 10; x++) {
                s.tables[x].querySelector('.table-title').innerText = s.sessionData.names[0].tables[x]
                // Create table items
                let itemCount = s.sessionData.tables[0][x].length
                for (let y = 0; y < itemCount; y++) {
                    let newItem = MenuMaker.createTableItemHTML(s.sessionData.tables[0][x][y])
                    s.tables[x].querySelector('.table-items').innerHTML += newItem
                }
            }
            // Update menu
            for (let x = 0; x < 5; x++) {
                s.menuGroups[x].querySelector('.menu-group-name').innerText = s.sessionData.names[x].group
                let dishCount = s.sessionData.menu[x].length
                // Hide group name if no dishes and menu split setting is on, else create dishes
                if (dishCount == 0 && s.sessionData.settings.split_menu == 0) {
                    s.menuGroupNames[x].classList.add('hidden')
                } else {
                    let dishContainer = s.menuGroups[x].querySelector('.menu-group-dishes')
                    for (let y = 0; y < dishCount; y++) {
                        let dish = s.sessionData.menu[x][y]
                        let newDish = MenuMaker.createMenuDishHTML(dish.id, dish.title, dish.items)
                        dishContainer.innerHTML += newDish
                    }
                }
            }
        },

        // Called when changing table group, creates tables based on session
        updateTables: function() {
            console.log(">> updateTables")
            let tableItems = document.querySelectorAll('.table-item')
            tableItems.forEach(item => { item.remove() })
            for (let x = 0; x < 10; x++) {
                s.tables[x].querySelector('.table-title').innerText = s.sessionData.names[s.groupIndex].tables[x]
                // Create table items
                let itemCount = s.sessionData.tables[s.groupIndex][x].length
                for (let y = 0; y < itemCount; y++) {
                    let newItem = MenuMaker.createTableItemHTML(s.sessionData.tables[s.groupIndex][x][y])
                    s.tables[x].querySelector('.table-items').innerHTML += newItem
                }
            }
            tableItems = document.querySelectorAll('.table-item')
            tableItems.forEach(item => { item.addEventListener('click', MenuMaker.selectTableItem) })
            // If edit mode active, call functions to toggle contentEditable for new divs
            if (s.editModeActive) {
                MenuMaker.toggleTableEditMode()
                MenuMaker.toggleMenuEditMode()
                MenuMaker.toggleButtonsEditMode()
            }
        },

        // Creates a new table item based on table input field
        createNewTableItem: function(target) {
            console.log(">> createNewTableItem")
            let text = target.value
            if (text.trim() == '') { return }
            let newItem = MenuMaker.createTableItemHTML(text)
            let tableItems = target.parentElement.querySelector('.table-items')
            tableItems.innerHTML += newItem
            target.value = ''
            // If item was created with edit mode active, set edit mode styles/actions
            if (s.editModeActive) { MenuMaker.toggleTableEditMode() }
            // Rebind UI actions for all items in this table
            MenuMaker.bindDynamicUIActions()
            // Update session
            let table = tableItems.parentElement.parentElement
            let indexClass = table.classList[1]
            let tableIndex = s.tableOrder.indexOf(indexClass)
            s.sessionData.tables[s.groupIndex][tableIndex].push(text)
            MenuMaker.sendPost()
        },

        //
        createTableItemHTML: function(text) {
            return `
                <div class="table-item">
                    <div class="item-checkbox"><span class="circle"></span></div>
                    <div class="item-content">` + text + `</div>
                </div>`
        },

        // Adds dish to menu, updates session
        createNewMenuDish: function() {
            console.log(">> createNewMenuDish")
            let id = s.buildID.value
            let title = s.buildTitle.value
            let ingredients = s.buildItems.innerText
            // Ingredients and description are required, id is optional
            if (title.trim() != '' && ingredients.trim() != '') {
                let newDish = MenuMaker.createMenuDishHTML(id, title, ingredients)
                let group = s.menuGroups[s.groupIndex]
                let groupDishes = group.querySelector('.menu-group-dishes')
                groupDishes.innerHTML += newDish
                group.querySelector('.menu-group-name').classList.remove('hidden')
                MenuMaker.deselectAllItems()
                MenuMaker.cacheMenu()
                MenuMaker.sendPost()
                // If dish was created with edit mode active, set edit mode styles/actions
                if (s.editModeActive) {
                    MenuMaker.toggleMenuEditMode()
                    MenuMaker.toggleButtonsEditMode()
                }
                // Rebind UI actions for all items in this table
                MenuMaker.bindDynamicUIActions()
                // Flash menu button color to indicate the dish was added
                s.menuButton.style.backgroundColor = 'white'
                setTimeout(() => { s.menuButton.style.backgroundColor = '#ff6262' }, 400)
            }
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

        // Removes dish from menu and updates session
        deleteMenuDish: function(event) {
            console.log(">> deleteMenuDish")
            let dish = event.target.closest('.menu-dish')
            let group = dish.parentElement
            group.removeChild(dish)
            MenuMaker.cacheMenu()
            MenuMaker.sendPost()
        },

        // Toggle settings menu open/closed
        toggleSettingsMenu: function() {
            console.log(">> toggleSettingsMenu")
            s.settingsMenu.classList.toggle('hidden')
            if (s.settingsMenu.classList.contains('hidden')) {
                document.removeEventListener('click', MenuMaker.checkSettingsMenuClick, true)
            } else {
                document.addEventListener('click', MenuMaker.checkSettingsMenuClick, true)
            }
        },

        // Runs while settings menu is open, toggles off if user clicks outside of menu
        checkSettingsMenuClick: function(event) {
            console.log(">> checkSettingsMenuClick")
            if (!s.settingsMenu.contains(event.target) && !s.settingsButton.contains(event.target)) {
                MenuMaker.toggleSettingsMenu()
            }
        },

        // Toggle dropdown menu, assign temporary listener if opened
        toggleGroupDropdown: function() {
            console.log(">> toggleGroupDropdown")
            s.groupDropdown.classList.toggle('hidden')
            if (s.groupDropdown.classList.contains('hidden')) {
                document.removeEventListener('click', MenuMaker.checkDropdownClick, true)
                if (s.groupRenameActive) {
                    s.groupRenameActive = false
                    MenuMaker.renameGroup()
                }
            } else {
                document.addEventListener('click', MenuMaker.checkDropdownClick, true)
            }
        },

        //
        renameGroup: function(event) {
            let button, groupName
            if (!event) {
                button = document.querySelector('.group-rename:not(.inactive)')
                groupName = button.closest('.group-item').querySelector('.group-name')
            } else {
                button = event.target.closest('.group-rename')
                groupName = event.target.closest('.group-item').querySelector('.group-name')
            }
            let groupItem = groupName.parentElement
            button.classList.toggle('inactive')
            let groupEditActive = !button.classList.contains('inactive')
            if (groupEditActive) {
                s.oldGroupName = groupName.innerText
                s.groupRenameActive = true
                groupName.style.cursor = 'text'
                groupName.contentEditable = true
                groupName.focus()
                window.getSelection().selectAllChildren(groupName)
                window.getSelection().collapseToEnd()
                groupName.addEventListener('keydown', MenuMaker.checkKeypress, true)
            } else {
                s.groupRenameActive = false
                groupName.style.cursor = 'pointer'
                groupName.contentEditable = false
                groupName.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                // Update menu and session if group was renamed
                let newName = groupName.innerText
                if (newName != s.oldGroupName) {
                    if (groupItem.classList.contains('active')) { s.groupSelectorName.innerText = newName }
                    let g = s.groupOrder.indexOf(groupItem.classList[1])
                    s.menuGroupNames[g].innerText = newName
                    s.sessionData.names[g].group = newName
                    MenuMaker.sendPost()
                }
            }
        },

        // Listener, runs while dropdown is open, ends when user clicks outside of dropdown
        checkDropdownClick: function(event) {
            console.log(">> checkDropdownClick")
            let target = event.target
            if (!s.groupSelector.contains(target) && !s.groupDropdown.contains(target)) {
                document.removeEventListener('click', MenuMaker.checkDropdownClick, true)
                MenuMaker.toggleGroupDropdown()
            }
        },

        // Change active table group, fill in values from session
        changeGroup: function(event) {
            console.log(">> changeGroup")
            let newGroup = event.target.closest('.group-item')
            // Return if clicked group is already active or is being renamed
            if (newGroup.classList.contains('active')) { return }
            if (s.groupRenameActive) {
                let groupRenameButton = newGroup.querySelector('.group-rename')
                // Return if user clicks active group rename button
                if (!groupRenameButton.classList.contains('inactive')) { return }
                // Turn off group rename if user clicks anywhere outside of editable group name
                else {
                    s.groupEditActive = false
                    MenuMaker.renameGroup()
                }
            }
            // If edit mode is active, update session
            if (s.editModeActive) {
                MenuMaker.cacheActiveTables()
                MenuMaker.sendPost()
            }
            MenuMaker.deselectAllItems()
            let oldGroup = s.groupDropdown.querySelector('.group-item.active')
            oldGroup.classList.toggle('active')
            newGroup.classList.toggle('active')
            let newGroupName = newGroup.querySelector('.group-name').innerText
            s.groupSelectorName.innerText = newGroupName
            s.groupIndex = s.groupOrder.indexOf(newGroup.classList[1])
            MenuMaker.updateTables()
        },

        //
        toggleTableControlMenu: function(event) {
            console.log(">> toggleTableControlMenu")
            let table = event.target.closest('.table')
            let tableNumber = table.classList[1]
            // Hide open menus on any other tables except clicked
            let visibleMenus = document.querySelectorAll('.table-control-menu:not(.hidden)')
            visibleMenus.forEach(menu => {
                if (!table.contains(menu)) { menu.classList.add('hidden') }
            })
            // Toggles clicked menu
            let menu = table.querySelector('.table-control-menu')
            menu.classList.toggle('hidden')
            if (menu.classList.contains('hidden')) {
                console.log("REMOVE")
                document.removeEventListener('click', MenuMaker.checkTableMenuClick, true)
            } else {
                document.addEventListener('click', MenuMaker.checkTableMenuClick, true)
            }
        },

        // Hides all open table control menus
        hideTableControlMenus: function() {
            let visibleMenu = document.querySelector('.table-control-menu:not(.hidden)')
            if (visibleMenu) { visibleMenu.classList.add('hidden') }
            document.removeEventListener('click', MenuMaker.checkTableMenuClick, true)
        },

        // Runs while table control menu is open, toggles off is user clicks outside of menu
        checkTableMenuClick: function(event) {
            console.log(">> checkTableMenuClick")
            let validClick = false
            s.tableControlMenus.forEach(menu => { if (menu.contains(event.target)) {
                console.log("CLICKED IN MENU - return")
                validClick = true
            } })
            if (validClick == false) {
                s.tableControlButtons.forEach(button => { if (button.contains(event.target)) {
                    console.log("CLICKED IN button - return")
                    validClick = true
                } })
            }
            if (validClick == false ) { MenuMaker.hideTableControlMenus() }
        },

        // Deletes all items from a single table
        deleteTableItems: function(event) {
            console.log(">> deleteTableItems")
            let table = event.target.closest('.table')
            let tableItems = table.querySelector('.table-items')
            tableItems.innerHTML = ''
        },

        //
        selectTableItem: function(event) {
            console.log(">> selectTableItem")
            let tableItem = event.target
            if (tableItem.classList[0] != 'table-item') {
                tableItem = tableItem.closest('.table-item')
            }
            let textBox = tableItem.querySelector('.item-content')
            if (textBox.contains(event.target) && s.editModeActive) { return }
            // Only allow one selection per table
            let oldItem = tableItem.parentElement.querySelector('.table-item.selected')
            if (oldItem) {
                if (oldItem != tableItem) { oldItem.classList.toggle('selected') }
            }
            tableItem.classList.toggle('selected')
            MenuMaker.updateBuildBox()
            // Set visibility of dish id/title fields
            let itemSelected = document.querySelector('.table-item.selected')
            if ((itemSelected && s.buildInfo.classList.contains('hidden')) ||
                (!itemSelected && !s.buildInfo.classList.contains('hidden'))) {
                    s.buildInfo.classList.toggle('hidden')
            }
        },

        // Dish builder deselect button, clear table selecitons and dish builder fields
        deselectAllItems: function() {
            console.log(">> deselectAllItems")
            s.buildInfo.classList.add('hidden')
            let activeItems = document.querySelectorAll('.table-item.selected')
            activeItems.forEach(item => item.classList.toggle('selected'))
            s.buildID.value = ''
            s.buildTitle.value = ''
            s.buildItems.innerText = ''
        },

        //
        updateBuildBox: function() {
            console.log(">> updateBuildBox")
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
            // If edit mode was turned off, update session
            if (!s.editModeActive) {
                MenuMaker.cacheActiveTables()
                MenuMaker.sendPost()
            }
            // Call functions to toggle contentEditable for divs
            MenuMaker.toggleTableEditMode()
            MenuMaker.toggleMenuEditMode()
            MenuMaker.toggleButtonsEditMode()
        },

        // Toggle edit mode for tables
        toggleTableEditMode: function() {
            s.tables.forEach(table => {
                let tableTitle = table.querySelector('.table-title')
                let tableItems = table.querySelectorAll('.item-content')
                if (s.editModeActive) {
                    tableTitle.addEventListener('keydown', MenuMaker.checkKeypress, true)
                    tableTitle.style.cursor = 'text'
                    tableTitle.contentEditable = true
                    tableItems.forEach(item => {
                        item.addEventListener('keydown', MenuMaker.checkKeypress, true)
                        item.style.cursor = 'text'
                        item.contentEditable = true
                    })
                } else {
                    tableTitle.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                    tableTitle.style.cursor = 'default'
                    tableTitle.contentEditable = false
                    tableItems.forEach(item => {
                        item.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                        item.style.cursor = 'pointer'
                        item.contentEditable = false
                    })
                }
            })
        },

        // Toggle edit mode for menu
        toggleMenuEditMode: function() {
            let dishList = document.querySelectorAll('.menu-dish')
            dishList.forEach(dish => {
                let dishID = dish.querySelector('.dish-id')
                let dishTitle = dish.querySelector('.dish-title')
                let dishItems = dish.querySelector('.dish-items')
                if (s.editModeActive) {
                    dishID.addEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishTitle.addEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishItems.addEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishID.style.cursor = 'text'
                    dishTitle.style.cursor = 'text'
                    dishItems.style.cursor = 'text'
                    dishID.contentEditable = true
                    dishTitle.contentEditable = true
                    dishItems.contentEditable = true
                } else {
                    dishID.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishTitle.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishItems.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishID.style.cursor = 'pointer'
                    dishTitle.style.cursor = 'pointer'
                    dishItems.style.cursor = 'pointer'
                    dishID.contentEditable = false
                    dishTitle.contentEditable = false
                    dishItems.contentEditable = false
                }
            })
        },

        // Toggle edit mode for delete buttons
        toggleButtonsEditMode: function() {
            let menuButtons = document.querySelectorAll('.dish-delete')
            if (menuButtons.length) {
                if (s.editModeActive) {
                    menuButtons.forEach(button => button.classList.remove('inactive'))
                } else {
                    menuButtons.forEach(button => button.classList.add('inactive'))
                }
            }
        },

        // Check keypresses while in edit mode
        checkKeypress: function(event) {
            console.log("checkKeypress")
            if (event.key === 'Escape' || event.keyCode === 27) {
                document.removeEventListener('keypress', MenuMaker.checkKeypress, true)
                if (s.editModeActive) { MenuMaker.toggleEditMode() }
            } else if (event.key === 'Enter' || event.keyCode == 13) {
                if (event.target.className == 'table-input') {
                    MenuMaker.createNewTableItem(event.target)
                } else {
                    event.target.blur()
                }
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
                    ((charCount >= 60) && (elementClass == 'dish-title' || elementClass == 'build-title')) ||
                    ((charCount >= 40) && (elementClass == 'item-content' || elementClass == 'table-input' || elementClass == 'group-name')) ||
                    ((charCount >= 25) && (elementClass == 'table-title')) ||
                    ((charCount >= 4) && (elementClass == 'dish-id' || elementClass == 'build-id'))) {
                    event.preventDefault()
                }
            }
        },

        // Toggle menu visibility
        openMenu: function() {
            console.log(">> openMenu")
            s.menu.classList.toggle('hidden')
        },

        // Increments color theme setting, updates session
        changeColorTheme: function() {
            console.log(">> changeColorTheme")
            let theme = (s.sessionData.settings.color_theme + 1) % 4
            s.sessionData.settings.color_theme = theme
            MenuMaker.setColorTheme()
            MenuMaker.sendPost()
        },

        // Sets site colors based on session
        setColorTheme: function() {
            console.log(">> setColorTheme")
            let theme = ['DARK', 'LIGHT', 'GREY', 'SEPIA'][s.sessionData.settings.color_theme]
            s.colorThemeSpan.innerText = theme
            // UNFINISHED UNFINISHED UNFINISHED
            if (theme == 'DARK') {
                document.documentElement.style.setProperty('--background1', '#303040')
                document.documentElement.style.setProperty('--background2', '#00000040')
                document.documentElement.style.setProperty('--groupSelectorBackground', '#839496')
                document.documentElement.style.setProperty('--groupDropdownBackground', '#000000')
                document.documentElement.style.setProperty('--groupNameBackground', '#576263')
                document.documentElement.style.setProperty('--dishBuilderBackground', '#00000080')
                document.documentElement.style.setProperty('--tableBackground', '#000000')
                document.documentElement.style.setProperty('--tableItemBackground', '#000000')
                document.documentElement.style.setProperty('--tableItemHover', '#FFFFFF0F')
                document.documentElement.style.setProperty('--menuBackground', '#0C0B18')
                document.documentElement.style.setProperty('--popupBackground', '#000000')
                document.documentElement.style.setProperty('--popupRowBackground', '#FFFFFF1A')
                document.documentElement.style.setProperty('--popupBorder', '#FFFFFF33')
                document.documentElement.style.setProperty('--text1', '#FFFFFF')
                document.documentElement.style.setProperty('--text1-50', '#FFFFFF7F')
                document.documentElement.style.setProperty('--text2', '#000000')
                document.documentElement.style.setProperty('--text3', '#FFFFFF')
                document.documentElement.style.setProperty('--placeholderText', '#8E8E8E')
            } else if (theme == 'LIGHT') {
                document.documentElement.style.setProperty('--background1', '#E9ECE6')
                document.documentElement.style.setProperty('--background2', '#0000001a')
                document.documentElement.style.setProperty('--groupSelectorBackground', '#717f81')
                document.documentElement.style.setProperty('--groupDropdownBackground', '#FFFFFF')
                document.documentElement.style.setProperty('--groupNameBackground', '#AFBABB')
                document.documentElement.style.setProperty('--dishBuilderBackground', '#717f81')
                document.documentElement.style.setProperty('--tableBackground', '#717f81')
                document.documentElement.style.setProperty('--tableItemBackground', '#FFFFFF')
                document.documentElement.style.setProperty('--tableItemHover', '#FFFFFFBF')
                document.documentElement.style.setProperty('--menuBackground', '#DAE2E3')
                document.documentElement.style.setProperty('--popupBackground', '#FFFFFF')
                document.documentElement.style.setProperty('--popupRowBackground', '#0000001A')
                document.documentElement.style.setProperty('--popupBorder', '#00000033')
                document.documentElement.style.setProperty('--text1', '#000000')
                document.documentElement.style.setProperty('--text1-50', '#0000007F')
                document.documentElement.style.setProperty('--text2', '#FFFFFF')
                document.documentElement.style.setProperty('--text3', '#FFFFFF')
                document.documentElement.style.setProperty('--placeholderText', '#FFFFFFBF')
            } else if (theme == 'GREY') {
                document.documentElement.style.setProperty('--background1', '#737373')

            } else if (theme == 'SEPIA') {
                document.documentElement.style.setProperty('--background1', '#DBCBB7')

            }
        },

        // Toggles menu split setting, updates session
        toggleMenuSplit: function() {
            console.log(">> toggleMenuSplit")
            let split = s.sessionData.settings.split_menu == 0 ? 1 : 0
            s.sessionData.settings.split_menu = split
            MenuMaker.setMenuSplit()
            MenuMaker.sendPost()
        },

        // Sets visibility of menu groups based on session
        setMenuSplit: function() {
            console.log(">> setMenuSplit")
            let split = ['ON', 'OFF'][s.sessionData.settings.split_menu]
            s.splitMenuSpan.innerText = split
            if (split == 'ON') {
                for (let x = 0; x < 5; x++) {
                    let dishCount = s.sessionData.menu[x].length
                    if (dishCount == 0) { s.menuGroupNames[x].classList.add('hidden') }
                    else { s.menuGroupNames[x].classList.remove('hidden') }
                }
            } else {
                s.menuGroupNames.forEach(group => group.classList.add('hidden'))
            }
        },

        // Export data, converts session into a base64 encoded string for user to copy
        exportData: function() {
            s.popupWarning.classList.add('hidden')
            s.popupHeader.innerText = 'Click to copy:'
            let base64 = btoa(JSON.stringify(s.sessionData))
            s.popupBody.innerText = MenuMaker.reverseString(base64)
            s.popupBody.contentEditable = false
            s.popupBody.style.cursor = 'pointer'
            MenuMaker.togglePopupBox(false)
        },

        //
        importData: function() {
            s.popupWarning.innerText = 'WARNING: Your current data will be replaced'
            s.popupWarning.classList.remove('hidden')
            s.popupHeader.innerText = 'Paste exported data below:'
            s.popupBody.innerText = ''
            s.popupBody.contentEditable = true
            s.popupBody.style.cursor = 'text'
            MenuMaker.togglePopupBox(true)
        },

        //
        togglePopupBox: function(isImport) {
            console.log(">> togglePopupBox")
            s.popupContainer.classList.toggle('hidden')
            if (s.popupContainer.classList.contains('hidden')) {
                if (isImport) {
                    document.removeEventListener('click', MenuMaker.checkPopupClickImport, true)
                    document.removeEventListener('input', MenuMaker.checkPopupKeypress, true)
                } else {
                    document.removeEventListener('click', MenuMaker.checkPopupClickExport, true)
                }
            } else {
                if (isImport) {
                    document.addEventListener('click', MenuMaker.checkPopupClickImport, true)
                    document.addEventListener('input', MenuMaker.checkPopupKeypress, true)
                } else {
                    document.addEventListener('click', MenuMaker.checkPopupClickExport, true)
                }
            }
        },

        // Checks clicks while popup is open, ends when user clicks outside of popup
        checkPopupClickImport: function(event) {
            console.log(">> checkPopupClick")
            let target = event.target
            if (!s.popupBox.contains(target)) {
                document.removeEventListener('click', MenuMaker.checkPopupClickImport, true)
                MenuMaker.togglePopupBox()
            }
        },

        // Checks if user input is a valid base64 encoded session object, updates session
        checkPopupKeypress: function(event) {
            console.log(">> checkPopupKeypress")
            let newSession
            let isValid = false
            let input = MenuMaker.reverseString(s.popupBody.innerText)
            let base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
            let dictRegex = /\{(.)+\}/g
            
            if (base64Regex.test(input)) {
                input = atob(input)
                if (dictRegex.test(input)) {
                    try {
                        newSession = JSON.parse(input)
                        if (s.sessionKeys.every(key => newSession.hasOwnProperty(key))) { isValid = true }
                    } catch { console.log("MISSING KEYS or INVALID OBJECT") }
                }
            }
            
            if (!isValid) {
                s.popupWarning.innerText = 'INVALID INPUT'
            } else {
                s.popupWarning.innerText = 'VALID INPUT - UPADING SITE'
                s.sessionData = newSession
                MenuMaker.wipeTablesAndMenus()
                MenuMaker.init()
                MenuMaker.sendPost()
                setTimeout(function() { s.popupOverlay.click() }, 2000)
            }
        },

        // Checks clicks while popup is open, ends when user clicks outside of popup
        checkPopupClickExport: function(event) {
            console.log(">> checkPopupClick")
            let target = event.target
            if (!s.popupBox.contains(target)) {
                document.removeEventListener('click', MenuMaker.checkPopupClickExport, true)
                MenuMaker.togglePopupBox()
            } else {
                navigator.clipboard.writeText(s.popupBody.innerText)
                let bColor = document.documentElement.style.getPropertyValue('--popupBackground')
                s.popupBox.style.backgroundColor = 'green'
                setTimeout(function() { s.popupBox.style.backgroundColor = bColor }, 300)
            }
        },

        // Returns reversed string (used to obfuscate base64 encoded session)
        reverseString: function(str) {
            return str.split('').reverse().join('')
        },

        // Updates session with the active table names/items (pulled from HTML)
        // Called before changing table group with edit mode active
        cacheActiveTables: function() {
            console.log(">> cacheActiveTables")
            let tableNames = ['', '', '', '', '', '', '', '', '', '']
            let tableData = [[], [], [], [], [], [], [], [], [], []]
            for (let x = 0; x < 10; x++) {
                let table = s.tables[x]
                tableNames[x] = table.querySelector('.table-title').innerText
                let tableItems = table.querySelectorAll('.item-content')
                for (let y = 0; y < tableItems.length; y++) {
                    tableData[x].push(tableItems[y].innerText)
                }
            }
            s.sessionData.names[s.groupIndex].tables = tableNames
            s.sessionData.tables[s.groupIndex] = tableData
        },

        // Updates session with the current menu dishes
        // Re-caching the entire menu is easier than deleting specific dishes from the session
        cacheMenu: function() {
            for (let x = 0; x < 5; x++) {
                let dishList = []
                let dishes = s.menuGroups[x].querySelectorAll('.menu-dish')
                dishes.forEach(dish => {
                    let d = {
                        'id': dish.querySelector('.dish-id').innerText,
                        'title': dish.querySelector('.dish-title').innerText,
                        'items': dish.querySelector('.dish-items').innerText
                    }
                    dishList.push(d)
                })
                s.sessionData.menu[x] = dishList
            }
        },

        // POST updated session object to Flask
        sendPost: function() {
            console.log(">> postSession")
            let data = new FormData()
            data.append('names', JSON.stringify(s.sessionData.names))
            data.append('tables', JSON.stringify(s.sessionData.tables))
            data.append('menu', JSON.stringify(s.sessionData.menu))
            data.append('settings', JSON.stringify(s.sessionData.settings))
            let xhr = new XMLHttpRequest
            xhr.responseType = 'json'
            xhr.open('POST', '/')
            xhr.send(data)
        },

        // Deletes all ingredients and dishes
        wipeTablesAndMenus: function() {
            console.log(">> wipeTablesAndMenus")
            s.tables.forEach(table => {
                let tableItems = table.querySelector('.table-items')
                tableItems.innerHTML = ''
            })
            s.menuGroups.forEach(menu => {
                let menuDishes = menu.querySelector('.menu-group-dishes')
                menuDishes.innerHTML = ''
            })
        },


        //
        clickElement: function(event) {
            console.log(">> clickElement")
            document.addEventListener('mouseup', MenuMaker.dropElement)
            document.addEventListener('mousemove', MenuMaker.dragElement)
        },

        //
        grabElement: function(event) {
            console.log(">> grabElement")
            s.dragItem = event.target.closest('.table-item')
            let clone = s.dragItem.cloneNode(true)
            s.dragItem.classList.add('drag-item')
            clone.classList.add('drag-clone')
            document.body.append(clone)
            s.dragClone = document.querySelector('.drag-clone')

            let pos = s.dragItem.getBoundingClientRect()
            s.startPos = {
                'offsetX': event.clientX - pos.left,
                'offsetY': event.clientY - pos.top
            }
            s.dragClone.style.left = pos.left + 'px'
            s.dragClone.style.top = pos.top + 'px'

            document.addEventListener('mouseup', MenuMaker.dropElement)
            document.addEventListener('mousemove', MenuMaker.dragElement)
        },

        //
        dragElement: function(event) {
            console.log(">> dragElement")
            if (!s.dragged) {
                s.dragged = true
                MenuMaker.grabElement(event)
            }
            s.dragClone.style.left = (event.clientX - s.startPos.offsetX) + 'px' 
            s.dragClone.style.top = (event.clientY - s.startPos.offsetY) + 'px'

            // Detect when mouse enters a valid drop point, update DOM
            s.dragClone.style.visibility = 'hidden'
            let hoverElement = document.elementFromPoint(event.clientX, event.clientY)
            s.dragClone.style.visibility = 'visible'
            if (s.lastHover !== hoverElement.classList[0]) {
                s.lastHover = hoverElement.classList[0]
                let validDrop = MenuMaker.isValidDrop(hoverElement)
                console.log("VALID DROP:  " + validDrop)

            }
            
        },

        //
        dropElement: function(event) {
            console.log(">> dropElement")
            //console.log("DRAGGED:  " + s.dragged)
            if (s.dragged) {
                s.dragged = false
                s.dragItem.classList.remove('drag-item')
                s.dragClone.remove()
                s.dragItem = null
                s.dragClone = null
            } else {
                MenuMaker.selectTableItem(event)
            }
            document.removeEventListener('mousemove', MenuMaker.dragElement)
            document.removeEventListener('mouseup', MenuMaker.dropElement)
        },

        //
        isValidDrop: function(hoverElement) {
            console.log(">> isValidDrop")
            console.log(hoverElement.classList)
            
            return false
        },


    }
    MenuMaker.init()
})