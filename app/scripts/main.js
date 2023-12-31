
import { DEFAULT_SESSION, DEFAULT_SESSION_TESTING } from "/app/scripts/default_session.js"
import * as createElement from '/app/scripts/create_element.js'



document.addEventListener('DOMContentLoaded', function() {
    var s,
    MenuMaker = {
        settings: {
            // Session is a JSON parsed copy of localStorage
            // Session is updated as changes are made, used to avoid constant localStorage string conversion
            'session': {},
            'sessionKeys': Object.keys(DEFAULT_SESSION).sort(),
            // Header
            'editModeButton': document.querySelector('.edit-icon'),
            'editModeActive': false,
            'settingsButton': document.querySelector('.settings-icon'),
            'settingsMenu': document.querySelector('.settings-menu'),
            'colorThemeButton': document.querySelector('.color-theme'),
            'colorThemeSpan': document.querySelector('.color-theme span'),
            'numberMenuButton': document.querySelector('.number-menu'),
            'numberMenuSpan': document.querySelector('.number-menu span'),
            'dishSpawnLocButton': document.querySelector('.dish-spawn-loc'),
            'dishSpawnLocSpan': document.querySelector('.dish-spawn-loc span'),
            'importDataButton': document.querySelector('.import-data'),
            'exportDataButton': document.querySelector('.export-data'),
            'deleteTablesButton': document.querySelector('.delete-tables'),
            'deleteMenuButton': document.querySelector('.delete-menu'),
            'deleteArchiveButton': document.querySelector('.delete-archive'),
            'deleteAllButton': document.querySelector('.delete-all'),
            'colorOrder': ['DARK', 'LIGHT', 'GREY', 'SEPIA'],
            // Dish builder and delete overlay
            'controls': document.querySelector('.controls'),
            'buildContainer': document.querySelector('.dish-build-container'),
            'buildInfo': document.querySelector('.build-info'),
            'buildID': document.querySelector('.build-id'),
            'buildTitle': document.querySelector('.build-title'),
            'buildItems': document.querySelector('.build-items'),
            'buildAdd': document.querySelector('.build-add'),
            'buildDeselect': document.querySelector('.build-deselect'),
            'itemDeleteOverlay': document.querySelector('.item-delete-overlay'),
            // Tables
            'tablesContainer': document.querySelector('.tables'),
            'tables': document.querySelectorAll('.table'),
            'tableTitles': document.querySelectorAll('.table-title'),
            'createTableGroupButtons': document.querySelectorAll('.create-table-group'),
            'tableInputs': document.querySelectorAll('.table-input'),
            'tableOrder': ['_0', '_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8', '_9'],
            // Menu
            'menu': document.querySelector('.menu'),
            'menuArchiveButton': document.querySelector('.menu-archive-button'),
            'menuArchive': document.querySelector('.menu-archive'),
            'menuBody': document.querySelector('.menu-body'),
            //'menuGroups': document.querySelectorAll('.menu-group'),
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
            'dropBox': null,
            'dragged': false,
            'startPos': {},
            'lastHover': '',
            'isHidden': false,
        },

        // Site init
        init: function() {
            console.log('>> >> >> >> >> >>>>   init   <<<< << << << << <<')
            s = MenuMaker.settings
            MenuMaker.setStorage()
            MenuMaker.setSession()
            console.log(s.session)
            MenuMaker.updateWithSessionData()
            MenuMaker.bindStaticUIActions()
            MenuMaker.bindDynamicUIActions()
            MenuMaker.setColorTheme()
        },

        // Bind Static UI actions (called at init)
        bindStaticUIActions: function() {
            console.log(">> bindStaticUIActions <<")
            s.menuButton.addEventListener('click', MenuMaker.openMenu)
            s.menuArchiveButton.addEventListener('click', MenuMaker.openArchive)
            s.editModeButton.addEventListener('click', MenuMaker.toggleEditMode)
            s.settingsButton.addEventListener('click', MenuMaker.toggleSettingsMenu)
            s.colorThemeButton.addEventListener('click', MenuMaker.changeColorTheme)
            s.importDataButton.addEventListener('click', MenuMaker.importData)
            s.exportDataButton.addEventListener('click', MenuMaker.exportData)
            // s.numberMenuButton.addEventListener('click', MenuMaker.toggleMenuNumbers)
            // s.dishSpawnLocButton.addEventListener('click', MenuMaker.setDishSpawn)
            // s.deleteTablesButton.addEventListener('click', MenuMaker.deleteAllTables)
            // s.deleteMenuButton.addEventListener('click', MenuMaker.deleteMenu)
            // s.deleteArchiveButton.addEventListener('click', MenuMaker.deleteArchive)
            // s.deleteAllButton.addEventListener('click', MenuMaker.deleteEverything)
            s.buildID.addEventListener('keydown', MenuMaker.checkKeypress, true)
            s.buildTitle.addEventListener('keydown', MenuMaker.checkKeypress, true)
            s.buildAdd.addEventListener('click', MenuMaker.createNewMenuDish)
            s.buildDeselect.addEventListener('click', MenuMaker.deselectAllItems)
            s.tableInputs.forEach(input => { input.addEventListener('keydown', MenuMaker.checkKeypress, true) })
            s.createTableGroupButtons.forEach(button => { button.addEventListener('click', MenuMaker.createNewTableGroup) })
        },

        // Bind dynamic UI actions (called at init and after creating a new table/menu item)
        bindDynamicUIActions: function() {
            console.log(">> bindDynamicUIActions <<")
            let tableItems = document.querySelectorAll('.table-item')
            tableItems.forEach(item => { item.addEventListener('mousedown', MenuMaker.clickElement) })
            let tableGroupNames = document.querySelectorAll('.table-group-name')
            tableGroupNames.forEach(name => { name.addEventListener('mousedown', MenuMaker.clickElement) })
            // let tableGroupHandles = document.querySelectorAll('.table-group-handle')
            // tableGroupHandles.forEach(handle => { handle.addEventListener('click', console.log("yo")) })
            let menuDishes = document.querySelectorAll('.menu-dish')
            menuDishes.forEach(dish => { dish.addEventListener('mousedown', MenuMaker.clickElement) })
            let menuGroupNames = document.querySelectorAll('.menu-group-name')
            menuGroupNames.forEach(name => { name.addEventListener('mousedown', MenuMaker.clickElement) })
            // let menuGroupHandles = document.querySelectorAll('.menu-group-handle')
            // menuGroupHandles.forEach(handle => { handle.addEventListener('click', console.log("yo")) })
            let dishArchiveButtons = s.menu.querySelectorAll('.dish-archive-button')
            dishArchiveButtons.forEach(button => { button.addEventListener('click', MenuMaker.archiveDish) })
        },

        // Checks localStorage for site data, if not found sets default values
        setStorage: function() {
            console.log(">> setStorage")
            let isValid = s.sessionKeys.every(key => localStorage.hasOwnProperty(key))
            let forceNew = false // TEMPORARY TEMPORARY TEMPORARY
            if (!isValid || forceNew) {
                console.log("\n!!!!!!!!!!!! NEW SESSION !!!!!!!!!!!!! NEW SESSION !!!!!!!!!!!!!\n")
                localStorage.clear()
                s.sessionKeys.forEach(key => {
                    let strValue = JSON.stringify(DEFAULT_SESSION_TESTING[key])
                    localStorage.setItem(key, strValue)
                })
            }
        },

        // Convert localStorage strings into objects ands save to session variable
        setSession: function() {
            console.log(">> setSession")
            s.sessionKeys.forEach(key => { s.session[key] = JSON.parse(localStorage[key]) })
        },

        // Updates site with stored data
        updateWithSessionData: function() {
            console.log(">> updateWithSessionData")
            // Update tables
            for (let x = 0; x < 10; x++) {
                // Update table name
                s.tables[x].querySelector('.table-title').innerText = s.session.tables[x].name
                // Create new groups (if not ungrouped) and fill with items
                let tableItems = s.tables[x].querySelector('.table-items')
                let tableGroups = s.session.tables[x].groups
                for (let y = 0; y < tableGroups.length; y++) {
                    let groupName = tableGroups[y].name
                    let className = MenuMaker.groupNameToClassName(groupName)
                    let groupItems = tableGroups[y].items
                    let newGroup = createElement.tableGroupHTML(groupName, className)
                    tableItems.innerHTML += newGroup
                    let itemBox = tableItems.querySelector('.table-group.' + className)
                    if (itemBox) {
                        for (let z = 0; z < groupItems.length; z++) {
                            let newItem = createElement.tableItemHTML(groupItems[z])
                            itemBox.innerHTML += newItem
                        }
                    } else {
                        console.error("ERROR: " + className + " TABLE GROUP NOT FOUND")
                        return
                    }
                }
            }
            // Update menu and archive
            fillDishBox(s.session.menu, s.menuBody)
            fillDishBox(s.session.archive, s.menuArchive)
            function fillDishBox(dishes, dishBox) {
                for (let x = 0; x < dishes.length; x++) {
                    let groupName = dishes[x].name
                    let className = MenuMaker.groupNameToClassName(groupName)
                    let groupDishes = dishes[x].dishes
                    dishBox.innerHTML += createElement.menuGroupHTML(groupName, className)
                    let newGroup = dishBox.querySelector('.menu-group.' + className)
                    if (newGroup) {
                        for (let y = 0; y < groupDishes.length; y++) {
                            let dish = groupDishes[y]
                            let newDish = createElement.menuDishHTML(dish.id, dish.title, dish.items)
                            newGroup.innerHTML += newDish
                        }
                    } else {
                        console.error("ERROR: " + className + " MENU GROUP NOT FOUND")
                        return
                    }
                }
            }
        },

        // Creates a new table group
        createNewTableGroup: function(event) {
            console.log(">> createNewTableGroup")
            let table = event.target.closest('.table')
            let tableItems = table.querySelector('.table-items')
            tableItems.innerHTML += createElement.tableGroupHTML('New group', 'new-group')
            // Update session
            let indexClass = table.classList[1]
            let tableIndex = s.tableOrder.indexOf(indexClass)
            let newGroupObject = {
                "name": "New group",
                "items": []
            }
            s.session.tables[tableIndex].groups.push(newGroupObject)
            MenuMaker.updateLocalStorage()
            MenuMaker.bindDynamicUIActions()
        },

        // Creates a new table item based on table input field
        createNewTableItem: function(target) {
            console.log(">> createNewTableItem")
            let text = target.value
            if (text.trim() == '') { return }
            let newItem = createElement.tableItemHTML(text)
            let tableGroup = target.parentElement.querySelector('.table-group.ungrouped')
            tableGroup.insertAdjacentHTML('afterbegin', newItem)
            target.value = ''
            // If item was created with edit mode active, set edit mode styles/actions
            if (s.editModeActive) { MenuMaker.toggleTableEditMode() }
            // Rebind UI actions for all items in this table
            MenuMaker.bindDynamicUIActions()
            // Update session
            let table = tableGroup.closest('.table')
            let indexClass = table.classList[1]
            let tableIndex = s.tableOrder.indexOf(indexClass)
            s.session.tables[tableIndex].groups[0].items.unshift(text)
            MenuMaker.updateLocalStorage()
        },

        // Adds dish to menu, updates session
        createNewMenuDish: function() {
            console.log(">> createNewMenuDish")
            let id = s.buildID.value
            let title = s.buildTitle.value
            let items = s.buildItems.innerText
            if (items.trim() != '') {
                // If title is empty, use the selected ingredients as the title
                if (title == '') {
                    title = items
                    items = ''
                }
                let newItem = createElement.menuDishHTML(id, title, items)
                let menuGroup = s.menuBody.querySelector('.menu-group.ungrouped')
                menuGroup.insertAdjacentHTML('afterbegin', newItem)
                MenuMaker.deselectAllItems()
                MenuMaker.cacheMenu()
                MenuMaker.updateLocalStorage()
                // Update UI actions and buttons for new dish
                if (s.editModeActive) {
                    MenuMaker.toggleMenuEditMode()
                }
                MenuMaker.bindDynamicUIActions()
                // Flash menu button color to indicate the dish was added
                s.menuButton.style.backgroundColor = 'white'
                setTimeout(() => { s.menuButton.style.backgroundColor = '#ff6262' }, 400)
            }
        },

        // Toggle settings menu open/closed
        toggleSettingsMenu: function() {
            console.log(">> toggleSettingsMenu")
            s.settingsButton.classList.toggle('active')
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

        //
        selectTableItem: function(event) {
            console.log(">> selectTableItem")
            let tableItem = event.target
            if (tableItem.classList[0] != 'table-item') {
                tableItem = tableItem.closest('.table-item')
                if (!tableItem) {
                    console.warn("selectTableItem RETURNING (TEMP)")
                    return // temp temp temp temp temp
                }
            }
            let textBox = tableItem.querySelector('.item-content')
            if (textBox.contains(event.target) && s.editModeActive) { return }
            // Only allow one selection per table
            let tableItems = tableItem.closest('.table-items')
            let oldItem = tableItems.querySelector('.table-item.selected')
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
            let selectedItems = document.querySelectorAll('.table-item.selected:not(.drag-clone)')
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
                MenuMaker.cacheTables()
                MenuMaker.cacheMenu()
                MenuMaker.updateLocalStorage()
            }
            // Call functions to toggle contentEditable for divs
            MenuMaker.toggleTableEditMode()
            MenuMaker.toggleMenuEditMode()
        },

        // Toggle edit mode for tables
        toggleTableEditMode: function() {
            s.tables.forEach(table => {
                let tableTitle = table.querySelector('.table-title')
                let tableGroups = table.querySelectorAll('.table-group')
                let tableItems = table.querySelectorAll('.item-content')
                if (s.editModeActive) {
                    tableTitle.addEventListener('keydown', MenuMaker.checkKeypress, true)
                    tableTitle.style.cursor = 'text'
                    tableTitle.contentEditable = true
                    tableGroups.forEach(group => {
                        if (group.classList.contains('ungrouped')) { return }
                        group.addEventListener('keydown', MenuMaker.checkKeypress, true)
                        group.style.cursor = 'text'
                        group.contentEditable = true
                    })
                    tableItems.forEach(item => {
                        item.addEventListener('keydown', MenuMaker.checkKeypress, true)
                        item.style.cursor = 'text'
                        item.contentEditable = true
                    })
                } else {
                    tableTitle.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                    tableTitle.style.cursor = 'default'
                    tableTitle.contentEditable = false
                    tableGroups.forEach(group => {
                        if (group.classList.contains('ungrouped')) { return }
                        group.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                        group.style.cursor = 'pointer'
                        group.contentEditable = false
                    })
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
            let dishList = s.menuBody.querySelectorAll('.menu-dish')
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

        // Toggle archive visibility
        openArchive: function() {
            console.log(">> openArchive")
            s.menuArchive.classList.toggle('hidden')
        },

        // Increments color theme setting, updates session
        changeColorTheme: function() {
            console.log(">> changeColorTheme")
            let theme = (s.session.settings.color_theme + 1) % 4
            s.session.settings.color_theme = theme
            MenuMaker.setColorTheme()
            MenuMaker.updateLocalStorage()
        },

        // Sets site colors based on session
        setColorTheme: function() {
            console.log(">> setColorTheme")
            let theme = ['DARK', 'LIGHT', 'GREY', 'SEPIA'][s.session.settings.color_theme]
            s.colorThemeSpan.innerText = theme
            // UNFINISHED UNFINISHED UNFINISHED
            if (theme == 'DARK') {
                document.documentElement.style.setProperty('--background1', '#303040')
                // document.documentElement.style.setProperty('--background2', '#00000033')
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
                // document.documentElement.style.setProperty('--background2', '#00000033')
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

        // Export data, converts session into a base64 encoded string for user to copy
        exportData: function() {
            s.popupWarning.classList.add('hidden')
            s.popupHeader.innerText = 'Click to copy:'
            let base64 = btoa(JSON.stringify(s.session))
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
            //unfinished
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
                        isValid = s.sessionKeys.every(key => newSession.hasOwnProperty(key))
                    } catch { console.warn("INPUT MISSING KEYS or INVALID OBJECT") }
                }
            }
            
            if (!isValid) {
                s.popupWarning.innerText = 'INVALID INPUT'
            } else {
                console.warn("checkPopupKeypress - Import unfinished")
                s.popupWarning.innerText = 'VALID INPUT - UPADING SITE'
                // s.session = newSession
                // MenuMaker.wipeTablesAndMenus()
                // MenuMaker.init()
                // MenuMaker.updateLocalStorage()
                // setTimeout(function() { s.popupOverlay.click() }, 2000)
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

        // Updates session with the current table data
        cacheTables: function() {
            console.log(">> cacheTables")
            let newTables = JSON.parse(JSON.stringify(DEFAULT_SESSION.tables))
            for (let x = 0; x < 10; x++) {
                newTables[x].name = s.tableTitles[x].innerText
                let tableGroups = s.tables[x].querySelectorAll('.table-group')
                for (let y = 0; y < tableGroups.length; y++) {
                    let groupTag = tableGroups[y].querySelector('.table-group-name') 
                    let groupName = groupTag ? groupTag.innerText : 'ungrouped'
                    let groupItems = tableGroups[y].querySelectorAll('.item-content')
                    let itemContents = []
                    for (let z = 0; z < groupItems.length; z++) {
                        itemContents.push(groupItems[z].innerText)
                    }
                    // If ungrouped, push to existing group object in default session, else create new
                    if (groupName == 'ungrouped') {
                        newTables[x].groups[0].items = itemContents
                    } else {
                        let newGroupObject = {
                            "name": groupName,
                            "items": itemContents
                        }
                        newTables[x].groups.push(newGroupObject)
                    }
                }
            }
            s.session.tables = newTables
        },

        // Updates session with the current menu and archive data
        cacheMenu: function() {
            console.log(">> cacheMenu")
            s.session.menu = (cacheDishes(s.menuBody))
            s.session.archive = (cacheDishes(s.menuArchive))
            function cacheDishes(dishBox) {
                let newMenu = JSON.parse(JSON.stringify(DEFAULT_SESSION.menu))
                let menuGroups = dishBox.querySelectorAll('.menu-group')
                for (let x = 0; x < menuGroups.length; x++) {
                    let groupTag = menuGroups[x].querySelector('.menu-group-name')
                    let groupName = groupTag ? groupTag.innerText : 'ungrouped'
                    let groupDishes = menuGroups[x].querySelectorAll('.menu-dish')
                    let dishContents = []
                    for (let y = 0; y < groupDishes.length; y++) {
                        let dish = {
                            "id": groupDishes[y].querySelector('.dish-id').innerText,
                            "title": groupDishes[y].querySelector('.dish-title').innerText,
                            "items": groupDishes[y].querySelector('.dish-items').innerText,
                        }
                        dishContents.push(dish)
                    }
                    // If ungrouped, push to existing group object in default session, else create new
                    if (groupName == 'ungrouped') {
                        newMenu[0].dishes = dishContents
                    } else {
                        let newGroupObject = {
                            "name": groupName,
                            "dishes": dishContents
                        }
                        newMenu.push(newGroupObject)
                    }
                }
                return newMenu
            }
        },

        // Update localStorage object
        updateLocalStorage: function() {
            console.log(">> updateLocalStorage")
            //localStorage.clear()
            console.warn("UPDATING STORAGE WITH: ", s.session)
            localStorage.setItem('tables', JSON.stringify(s.session.tables))
            localStorage.setItem('menu', JSON.stringify(s.session.menu))
            localStorage.setItem('archive', JSON.stringify(s.session.archive))
            localStorage.setItem('settings', JSON.stringify(s.session.settings))
        },

        //
        clickElement: function(event) {
            console.log(">> clickElement")
            let target = event.target
            s.dragItem = target.closest('.table-item')
            if (!s.dragItem) { s.dragItem = target.closest('.table-group') }
            if (!s.dragItem) { s.dragItem = target.closest('.menu-dish') }
            if (!s.dragItem) { s.dragItem = target.closest('.menu-group') }

            document.addEventListener('mouseup', MenuMaker.dropElement)
            document.addEventListener('mousemove', MenuMaker.dragElement)
        },

        //
        dragElement: function(event) {
            console.log(">> dragElement")
            if (!s.dragged) {
                s.dragged = true
                if (s.dragItem.classList.contains('table-item') || s.dragItem.classList.contains('table-group')) {
                    MenuMaker.toggleItemDeleteOverlay(true)
                }
                MenuMaker.grabElement(event)
            }
            s.dragClone.style.left = (event.clientX - s.startPos.offsetX) + 'px' 
            s.dragClone.style.top = (event.clientY - s.startPos.offsetY) + 'px'
            // Detect when mouse enters a valid drop point, update DOM
            s.dragClone.style.visibility = 'hidden'
            let hoverElement = document.elementFromPoint(event.clientX, event.clientY)
            if (!hoverElement) { return }
            let hoverClasses = [...hoverElement.classList].join('')
            s.dragClone.style.visibility = 'visible'
            if (s.lastHover !== hoverClasses) {
                s.lastHover = hoverClasses
                s.dropBox = MenuMaker.getDropBox(hoverElement)
                let draggingOverDelete = false
                // Update DOM while dragging over valid drop locations
                if (s.dropBox) {
                    //console.log("DROP BOX: ", s.dropBox)
                    if (s.dropBox.classList.contains('item-delete-overlay')) {
                        s.isHidden = true
                        draggingOverDelete = true
                        s.itemDeleteOverlay.classList.add('drop')
                        s.dragItem.style.display = 'none'
                    }
                    else if (s.dropBox.classList.contains('table-items') || s.dropBox.classList.contains('table-group') ||
                            s.dropBox.classList.contains('menu-group') || s.dropBox.classList.contains('menu-body') || s.dropBox.classList.contains('menu-archive')) {
                        let tableDropPos = MenuMaker.getTableDropPos(event.clientY)
                        MenuMaker.insertChildAtIndex(s.dragItem, s.dropBox, tableDropPos)
                    }
                }
                // Reset delete item overlay styles, unhide element
                if (s.isHidden && !draggingOverDelete) {
                    s.isHidden = false
                    s.itemDeleteOverlay.classList.remove('drop')
                    s.dragItem.style.display = 'block'
                }
            }
        },

        //
        grabElement: function(event) {
            console.log(">> grabElement")
            let clone = s.dragItem.cloneNode(true)
            s.dragItem.classList.add('drag-item')
            clone.classList.add('drag-clone')
            document.body.append(clone)
            s.dragClone = document.querySelector('.drag-clone')
            s.dragClone.style.width = s.dragItem.offsetWidth + 'px'

            let pos = s.dragItem.getBoundingClientRect()
            s.startPos = {
                'offsetX': event.clientX - pos.left,
                'offsetY': event.clientY - pos.top
            }
            s.dragClone.style.left = pos.left + 'px'
            s.dragClone.style.top = pos.top + 'px'
        },

        //
        dropElement: function(event) {
            console.log(">> dropElement")
            if (!s.dragItem) {
                console.error("ERROR DRAGITEM IS NULL")
                return
            }
            if (s.dragged) {
                if (s.dropBox) {
                    if (s.dragItem.classList.contains('table-item') || s.dragItem.classList.contains('table-group')) {
                        if (s.dropBox.classList.contains('item-delete-overlay')) {
                            s.dragItem.remove()
                        } else {
                            let tableItems = s.dropBox.closest('.table-items')
                            let activeItems = tableItems.querySelectorAll('.table-item.selected')
                            if (activeItems.length > 1) {
                                activeItems.forEach(item => { item.classList.remove('selected') })
                            }
                        }
                        MenuMaker.cacheTables()
                    } else if (s.dragItem.classList.contains('menu-dish') ||s.dragItem.classList.contains('menu-group')) {
                        MenuMaker.cacheMenu()
                    }
                } else { console.warn("DROPBOX IS NULL") }
                s.dragged = false
                s.dragItem.classList.remove('drag-item')
                s.dragClone.remove()
                s.dragItem = null
                s.dragClone = null
                s.dropBox = null
                MenuMaker.toggleItemDeleteOverlay(false)
                MenuMaker.updateBuildBox()
                MenuMaker.updateLocalStorage()
            } else if (s.dragItem.classList.contains('table-item')) {
                MenuMaker.selectTableItem(event)
            }
            document.removeEventListener('mousemove', MenuMaker.dragElement)
            document.removeEventListener('mouseup', MenuMaker.dropElement)
        },

        //
        getDropBox: function(hoverElement) {
            console.log(">> getDropBox")
            let dropBox = null
            if (s.dragItem.classList.contains('table-item')) {
                dropBox = hoverElement.closest('.table-group') || hoverElement.closest('.table') || hoverElement.closest('.item-delete-overlay')
                if (dropBox.classList.contains('table')) {
                    dropBox = dropBox.querySelector('.table-group.ungrouped')
                }
            } else if (s.dragItem.classList.contains('table-group')) {
                dropBox = hoverElement.closest('.table') || hoverElement.closest('.item-delete-overlay')
                if (dropBox.classList.contains('table')) {
                    dropBox = dropBox.querySelector('.table-items')
                }
            } else if (s.dragItem.classList.contains('menu-dish')) {
                dropBox = hoverElement.closest('.menu-group') || hoverElement.closest('.menu-body') || hoverElement.closest('.menu-archive')
                if (dropBox.classList.contains('menu-body') || dropBox.classList.contains('menu-archive')) {
                    dropBox = dropBox.querySelector('.menu-group.ungrouped')
                }
            } else if (s.dragItem.classList.contains('menu-group')) {
                dropBox = hoverElement.closest('.menu-body') || hoverElement.closest('.menu-archive')
            }
            if (!dropBox) { console.error("ERROR GETDROPBOX NOT FOUND") }
            return dropBox
        },

        // Finds index where the cursor position best fits into dropBox
        getTableDropPos: function(clientY) {
            console.log(">> getTableDropPos")
            let items = s.dropBox.querySelectorAll(':scope > div')
            if (!items) { return 0 }
            // Check if cursor is lower than each element, bottom up
            for (let i = items.length - 1; i >= 0; i--) {
                let itemBox = items[i].getBoundingClientRect()
                if (clientY >= itemBox.top) {
                    return i + 1
                }
            }
            // Cursor is above the highest element
            if (s.dropBox.classList.contains('table-items') ||
                s.dropBox.classList.contains('menu-body') ||
                s.dropBox.classList.contains('menu-archive')) {
                return 1
            }
            return 0
        },

        //
        insertChildAtIndex: function(child, parent, index) {
            console.log(">> insertChildAtIndex")
            if (index > parent.children.length) {
                parent.appendChild(child)
            } else {
                parent.insertBefore(child, parent.children[index])
            }
        },

        //
        toggleItemDeleteOverlay: function(turnOn) {
            if (turnOn) {
                s.itemDeleteOverlay.classList.remove('hidden')
            } else {
                s.itemDeleteOverlay.classList.add('hidden')
            }
        },

        // Converts group name to HTML class name standards
        groupNameToClassName: function(groupName) {
            let className = groupName.toLowerCase()
            return className.replaceAll(' ', '-')
        },

        //
        archiveDish: function(event) {
            console.log(">> moveToArchive")
            let dish = event.target.closest('.menu-dish')
            if (s.menuBody.contains(dish)) {
                let ungrouped = s.menuArchive.querySelector('.menu-group.ungrouped')
                MenuMaker.insertChildAtIndex(dish, ungrouped, 0)
                MenuMaker.cacheMenu()
                MenuMaker.updateLocalStorage()
            }
        },


    }
    MenuMaker.init()
})